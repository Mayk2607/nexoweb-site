-- Website lead capture: required email + lead scoring field
-- Run against the Supabase project used by nexoweb-site (public.leads).

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS primary_goal TEXT;

COMMENT ON COLUMN public.leads.email IS 'Correo del prospecto (formulario web)';
COMMENT ON COLUMN public.leads.primary_goal IS 'Objetivo principal declarado (filtrado / scoring)';
