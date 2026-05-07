-- ============================================================
-- NEXOWEB SITE — Schema completo
-- Ejecutar en: SQL Editor de Supabase (proyecto vijzsdgxwzkxfviacxvy)
-- ============================================================

-- ────────────────────────────────────────
-- 1. LEADS (prospectos del formulario web y CRM)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Datos del prospecto
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  company       TEXT,

  -- Interés comercial
  service       TEXT,
  primary_goal  TEXT,
  message       TEXT,
  source        TEXT DEFAULT 'Website Contact Form',

  -- Pipeline CRM
  status        TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new','contacted','proposal_sent','won','lost')),

  -- Detalles editables desde el CRM
  address       TEXT,
  requirements  TEXT
);

COMMENT ON TABLE  public.leads IS 'Prospectos captados por el formulario web y/o ingresados manualmente en el CRM.';
COMMENT ON COLUMN public.leads.primary_goal IS 'Objetivo principal declarado por el prospecto (scoring/segmentación).';
COMMENT ON COLUMN public.leads.source       IS 'Canal de origen del prospecto.';

-- ────────────────────────────────────────
-- 2. LEAD NOTES (bitácora interna)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id    UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  content    TEXT NOT NULL
);

-- ────────────────────────────────────────
-- 3. CLIENTS (clientes ganados)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id      UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_code  VARCHAR(50) UNIQUE,
  name         TEXT NOT NULL,
  email        TEXT,
  phone        TEXT,
  company      TEXT,
  address      TEXT,
  requirements TEXT
);

-- ────────────────────────────────────────
-- 4. QUOTES (cotizaciones)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quotes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id     UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  items       JSONB DEFAULT '[]',
  activities  JSONB DEFAULT '[]',
  scope       TEXT DEFAULT '',
  subtotal    NUMERIC(12,2) DEFAULT 0,
  tax         NUMERIC(12,2) DEFAULT 0,
  total       NUMERIC(12,2) DEFAULT 0,
  valid_until DATE
);

-- ────────────────────────────────────────
-- 5. PROJECTS (proyectos activos)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id        UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  quote_id       UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  status         TEXT NOT NULL DEFAULT 'active'
                 CHECK (status IN ('active','paused','completed','cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending'
                 CHECK (payment_status IN ('pending','partial','paid'))
);

-- ────────────────────────────────────────
-- 6. INVOICES (pagos registrados)
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invoices (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  amount     NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes      TEXT
);

-- ────────────────────────────────────────
-- RLS: habilitar (acceso controlado por sesión del CRM)
-- ────────────────────────────────────────
ALTER TABLE public.leads      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices   ENABLE ROW LEVEL SECURITY;

-- Política temporal: acceso total para usuarios autenticados
-- (ajustar a roles específicos en producción)
CREATE POLICY "authenticated_all" ON public.leads      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON public.lead_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON public.clients    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON public.quotes     FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON public.projects   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all" ON public.invoices   FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Política para el formulario web público (anon puede insertar leads)
CREATE POLICY "anon_insert_leads" ON public.leads FOR INSERT TO anon WITH CHECK (true);
