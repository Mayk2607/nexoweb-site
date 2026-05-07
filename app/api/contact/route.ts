import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, company, service, message, primary_goal } = data;

    if (!name || !phone || !email || !company || !service || !primary_goal) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabase.from("leads").insert([
      {
        name,
        phone,
        email,
        company,
        service,
        message,
        primary_goal,
        source: "Website Contact Form",
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("Error guardando en Supabase:", dbError);
    }

    try {
      if (resend) {
        await resend.emails.send({
          from: "Nexoweb CRM <onboarding@resend.dev>",
          to: ["consultoria@nexoweb.mx"],
          subject: `Nuevo lead: ${service} — ${name}`,
          html: `
            <h2>Prospecto desde el formulario web</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Empresa:</strong> ${company}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${phone}</p>
            <p><strong>Servicio / interés:</strong> ${service}</p>
            <p><strong>Objetivo principal:</strong> ${primary_goal}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote>${message || "Sin mensaje"}</blockquote>
          `,
        });
      }
    } catch (emailError) {
      console.error("Error enviando correo interno:", emailError);
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
*NUEVO LEAD — NEXOWEB*

*Nombre:* ${name}
*Empresa:* ${company}
*Correo:* ${email}
*WhatsApp:* ${phone}
*Interés:* ${service}
*Objetivo:* ${primary_goal}

*Mensaje:*
_${message || "Sin mensaje"}_
      `;

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgError) {
        console.error("Error enviando Telegram:", tgError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error procesando lead:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
