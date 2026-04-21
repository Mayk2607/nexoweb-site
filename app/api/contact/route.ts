import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, company, service, message } = data;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase CRM
    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name,
          phone,
          company,
          service,
          message,
          source: 'Website Contact Form',
          status: 'new'
        }
      ]);

    if (dbError) {
      console.error("Error guardando en Supabase:", dbError);
      // No bloqueamos el envío de correo si falla Supabase, pero registramos el error
    }

    // 2. Enviar correo interno a Nexoweb (Resend - opcional)
    try {
      if (resend) {
        await resend.emails.send({
          from: 'Nexoweb CRM <onboarding@resend.dev>',
          to: ['consultoria@nexoweb.mx'],
          subject: `🔥 NUEVO LEAD: ${service} - ${name}`,
          html: `
            <h2>Nuevo Prospecto desde la web</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Teléfono/WhatsApp:</strong> ${phone}</p>
            <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
            <p><strong>Servicio:</strong> ${service}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote>${message || 'Sin mensaje'}</blockquote>
          `
        });
      }
    } catch (emailError) {
      console.error("Error enviando correo interno:", emailError);
    }

    // 3. Notificación instantánea vía Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🔥 *NUEVO LEAD - NEXOWEB* 🔥

👤 *Nombre:* ${name}
📱 *Teléfono:* ${phone}
🏢 *Empresa:* ${company || 'No especificada'}
🛠 *Servicio:* ${service}

💬 *Mensaje:*
_${message || 'Sin mensaje adicional'}_
      `;

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
          })
        });
      } catch (tgError) {
        console.error("Error enviando Telegram:", tgError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error procesando lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
