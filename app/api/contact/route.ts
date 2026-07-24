import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml,
  getClientIp,
  isRateLimited,
  isValidEmail,
  normalizeCrmLeadsUrl,
  sanitizeField,
} from "@/lib/contact-security";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type ChannelResult = { crm: boolean; email: boolean; telegram: boolean };

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
        { status: 429 }
      );
    }

    const data = await request.json();

    // Honeypot anti-spam (campo oculto; bots suelen llenarlo)
    if (typeof data._honeypot === "string" && data._honeypot.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const name = sanitizeField(data.name, 120);
    const phone = sanitizeField(data.phone, 30);
    const email = sanitizeField(data.email, 160);
    const company = sanitizeField(data.company, 120);
    const service = sanitizeField(data.service, 120);
    const primary_goal = sanitizeField(data.primary_goal, 200);
    const message = sanitizeField(data.message, 2000);

    if (!name || !phone || !email || !company || !service || !primary_goal) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Correo electrónico inválido" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const channels: ChannelResult = { crm: false, email: false, telegram: false };

    const leadNotes = [
      `Servicio: ${service}`,
      `Objetivo: ${primary_goal}`,
      message ? `Mensaje: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // ── 1. CRM (canal principal) ─────────────────────────────────────────────
    const crmUrl = normalizeCrmLeadsUrl();
    const CRM_INGEST_SECRET = process.env.CRM_INGEST_SECRET;

    if (crmUrl && CRM_INGEST_SECRET) {
      try {
        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nexoweb-public-ingest-key": CRM_INGEST_SECRET,
          },
          body: JSON.stringify({
            name,
            phone: cleanPhone || phone,
            email,
            company,
            notes: leadNotes,
            channel: "site:nexoweb.mx",
          }),
        });
        channels.crm = crmRes.ok;
        if (!crmRes.ok) {
          console.error("[CRM] Lead ingest failed:", crmRes.status, await crmRes.text());
        }
      } catch (err) {
        console.error("[CRM] Lead ingest error:", err);
      }
    }

    // ── 2. Email (Resend) ────────────────────────────────────────────────────
    const fromAddress = process.env.RESEND_FROM ?? "notificaciones@nexoweb.mx";
    const toAddress = process.env.RESEND_TO ?? "consultoria@nexoweb.mx";

    if (resend) {
      try {
        const emailRes = await resend.emails.send({
          from: `Nexoweb <${fromAddress}>`,
          to: [toAddress],
          subject: `Nuevo lead: ${service} — ${name}`,
          html: `
            <h2 style="color:#0a1224">Nuevo prospecto desde nexoweb.mx</h2>
            <table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
              <tr><td><strong>Nombre</strong></td><td>${escapeHtml(name)}</td></tr>
              <tr><td><strong>Empresa</strong></td><td>${escapeHtml(company)}</td></tr>
              <tr><td><strong>Correo</strong></td><td>${escapeHtml(email)}</td></tr>
              <tr><td><strong>WhatsApp</strong></td><td>${escapeHtml(phone)}</td></tr>
              <tr><td><strong>Servicio</strong></td><td>${escapeHtml(service)}</td></tr>
              <tr><td><strong>Objetivo</strong></td><td>${escapeHtml(primary_goal)}</td></tr>
              <tr><td><strong>Mensaje</strong></td><td>${escapeHtml(message || "—")}</td></tr>
            </table>
          `,
        });
        channels.email = !emailRes.error;
        if (emailRes.error) {
          console.error("[Resend] Email failed:", emailRes.error);
        }
      } catch (err) {
        console.error("[Resend] Email error:", err);
      }
    }

    // ── 3. Telegram ──────────────────────────────────────────────────────────
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const text = [
          `*🔔 NUEVO LEAD — NEXOWEB*`,
          ``,
          `*Nombre:* ${name.replace(/[*_`[\]]/g, "")}`,
          `*Empresa:* ${company.replace(/[*_`[\]]/g, "")}`,
          `*Correo:* ${email}`,
          `*WhatsApp:* ${phone}`,
          `*Servicio:* ${service.replace(/[*_`[\]]/g, "")}`,
          `*Objetivo:* ${primary_goal.replace(/[*_`[\]]/g, "")}`,
          message ? `*Mensaje:* _${message.replace(/[*_`[\]]/g, "")}_` : null,
        ]
          .filter(Boolean)
          .join("\n");

        const tgRes = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text,
              parse_mode: "Markdown",
            }),
          }
        );
        channels.telegram = tgRes.ok;
        if (!tgRes.ok) {
          console.error("[Telegram] Notification failed:", tgRes.status, await tgRes.text());
        }
      } catch (err) {
        console.error("[Telegram] Notification error:", err);
      }
    }

    const crmConfigured = Boolean(crmUrl && CRM_INGEST_SECRET);
    const emailConfigured = Boolean(resend);
    const telegramConfigured = Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
    const anyConfigured = crmConfigured || emailConfigured || telegramConfigured;

    const crmOk = !crmConfigured || channels.crm;
    const emailOk = !emailConfigured || channels.email;
    const telegramOk = !telegramConfigured || channels.telegram;
    const deliveryOk = crmOk && emailOk && telegramOk;

    if (anyConfigured && !deliveryOk) {
      console.error("[Contact API] Partial delivery failure:", channels);
      return NextResponse.json(
        { error: "No pudimos procesar tu solicitud. Escríbenos por WhatsApp." },
        { status: 502 }
      );
    }

    if (!anyConfigured) {
      console.error("[Contact API] No delivery channels configured");
      return NextResponse.json(
        { error: "Servicio de contacto temporalmente no disponible." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Unhandled error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
