import nodemailer from "nodemailer"

// ---------------------------------------------------------------------------
// Validate required env vars at module load time (fails fast at startup).
// ---------------------------------------------------------------------------
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_FROM = process.env.EMAIL_FROM ?? EMAIL_USER
const CONTACT_TO = process.env.CONTACT_TO ?? EMAIL_USER

if (!EMAIL_USER || !EMAIL_PASS) {
  // Log but don't throw — Next.js builds shouldn't crash if vars are absent.
  console.warn("mail: EMAIL_USER or EMAIL_PASS is not set. Email sending will fail at runtime.")
}

// ---------------------------------------------------------------------------
// Transporter — Gmail SMTP with App Password
// ---------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: EMAIL_USER ?? "",
    pass: EMAIL_PASS ?? "",
  },
})

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------
function buildHtmlBody(params: {
  nombre: string
  empresa: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
  sentAt: string
}): string {
  const { nombre, empresa, email, telefono, asunto, mensaje, sentAt } = params

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#1A2B4C;white-space:nowrap;width:120px;border-bottom:1px solid #e5e7eb;">${label}</td>
      <td style="padding:8px 12px;color:#333333;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
          <!-- Header -->
          <tr>
            <td style="background:#1A2B4C;padding:24px 32px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Maxwell S.A.</p>
              <p style="margin:4px 0 0;font-size:13px;color:#F26D21;">Nuevo mensaje desde el sitio web</p>
            </td>
          </tr>
          <!-- Subject banner -->
          <tr>
            <td style="background:#F26D21;padding:10px 32px;">
              <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;">Asunto: ${asunto}</p>
            </td>
          </tr>
          <!-- Data table -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                ${row("Nombre", nombre)}
                ${row("Empresa", empresa)}
                ${row("Email", `<a href="mailto:${email}" style="color:#F26D21;">${email}</a>`)}
                ${row("Teléfono", telefono)}
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:24px 32px;">
              <p style="margin:0 0 8px;font-weight:600;color:#1A2B4C;font-size:14px;">Mensaje:</p>
              <div style="background:#f8f9fa;border-left:4px solid #F26D21;padding:16px;border-radius:4px;color:#333333;font-size:14px;line-height:1.6;white-space:pre-wrap;">${mensaje}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Enviado el ${sentAt} desde www.maxwellsa.com.ar</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Plain-text fallback
// ---------------------------------------------------------------------------
function buildTextBody(params: {
  nombre: string
  empresa: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
  sentAt: string
}): string {
  return [
    "=== Nuevo mensaje desde www.maxwellsa.com.ar ===",
    "",
    `Asunto:    ${params.asunto}`,
    `Nombre:    ${params.nombre}`,
    `Empresa:   ${params.empresa}`,
    `Email:     ${params.email}`,
    `Teléfono:  ${params.telefono}`,
    "",
    "Mensaje:",
    params.mensaje,
    "",
    `Fecha/Hora: ${params.sentAt}`,
  ].join("\n")
}

// ---------------------------------------------------------------------------
// Confirmation email template (auto-reply to the sender)
// ---------------------------------------------------------------------------
function buildConfirmationHtml(nombre: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
          <!-- Header -->
          <tr>
            <td style="background:#1A2B4C;padding:24px 32px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Maxwell S.A.</p>
              <p style="margin:4px 0 0;font-size:13px;color:#F26D21;">Servicios de Ingeniería y Obra</p>
            </td>
          </tr>
          <!-- Orange accent -->
          <tr>
            <td style="background:#F26D21;padding:10px 32px;">
              <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;">Confirmación de recepción de mensaje</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;color:#1A2B4C;font-weight:600;">Hola, ${nombre}.</p>
              <p style="margin:0 0 16px;font-size:14px;color:#333333;line-height:1.7;">
                Recibimos tu mensaje correctamente. A la brevedad un integrante de nuestro equipo se pondrá en contacto con vos.
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#333333;line-height:1.7;">
                Si tu consulta es urgente, podés comunicarte con nosotros directamente por teléfono:
              </p>
              <table cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-left:4px solid #F26D21;border-radius:4px;padding:16px;width:100%;">
                <tr>
                  <td style="padding:4px 16px;font-size:14px;color:#333333;">📞 <strong>Oficina:</strong> 0221-4896360</td>
                </tr>
                <tr>
                  <td style="padding:4px 16px;font-size:14px;color:#333333;">📱 <strong>Móvil:</strong> 0221-15-4978097</td>
                </tr>
                <tr>
                  <td style="padding:4px 16px;font-size:14px;color:#333333;">✉️ <strong>Email:</strong> contacto@maxwellsa.com.ar</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;font-size:13px;color:#1A2B4C;font-weight:600;">Maxwell Servicios de Ingeniería y Obra S.A.</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">Calle 2 #1574, Piso 8 Depto B, La Plata, Buenos Aires — www.maxwellsa.com.ar</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildConfirmationText(nombre: string): string {
  return [
    `Hola, ${nombre}.`,
    "",
    "Recibimos tu mensaje correctamente. A la brevedad un integrante de nuestro equipo se pondrá en contacto con vos.",
    "",
    "Si tu consulta es urgente, podés comunicarte con nosotros directamente:",
    "  Oficina: 0221-4896360",
    "  Móvil:   0221-15-4978097",
    "  Email:   contacto@maxwellsa.com.ar",
    "",
    "Maxwell Servicios de Ingeniería y Obra S.A.",
    "Calle 2 #1574, Piso 8 Depto B, La Plata, Buenos Aires",
    "www.maxwellsa.com.ar",
  ].join("\n")
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export interface ContactEmailPayload {
  nombre: string
  empresa?: string
  email: string
  telefono?: string
  asunto: string
  mensaje: string
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials (EMAIL_USER / EMAIL_PASS) are not configured.")
  }

  const sentAt = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "long",
    timeStyle: "short",
  })

  const emailParams = {
    nombre: payload.nombre,
    empresa: payload.empresa || "—",
    email: payload.email,
    telefono: payload.telefono || "—",
    asunto: payload.asunto,
    mensaje: payload.mensaje,
    sentAt,
  }

  await transporter.sendMail({
    from: `"Maxwell S.A." <${EMAIL_FROM}>`,
    to: CONTACT_TO,
    replyTo: payload.email,
    subject: `[Web Contacto] ${payload.asunto}`,
    html: buildHtmlBody(emailParams),
    text: buildTextBody(emailParams),
  })
}

export async function sendConfirmationEmail(payload: Pick<ContactEmailPayload, "nombre" | "email">): Promise<void> {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials (EMAIL_USER / EMAIL_PASS) are not configured.")
  }

  await transporter.sendMail({
    from: `"Maxwell S.A." <${EMAIL_FROM}>`,
    to: payload.email,
    subject: "Recibimos tu mensaje — Maxwell S.A.",
    html: buildConfirmationHtml(payload.nombre),
    text: buildConfirmationText(payload.nombre),
  })
}
