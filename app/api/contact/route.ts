import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations/contact"

// In-memory rate limiting: max 3 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID()

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error("contact: missing RESEND_API_KEY", { requestId })
    return NextResponse.json(
      { error: "Configuración inválida del servidor.", requestId },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)

  // Modo test: por defecto usamos el remitente de sandbox de Resend
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"
  const fromName = process.env.RESEND_FROM_NAME ?? "Maxwell Web (Test)"
  const internalTo = process.env.RESEND_INTERNAL_TO_EMAIL ?? "contacto@maxwellsa.com.ar"

  // Rate limiting deshabilitado temporalmente para pruebas
  // const ip = getClientIp(req)
  // if (!checkRateLimit(ip)) {
  //   return NextResponse.json(
  //     { error: "Demasiadas solicitudes. Intente nuevamente en unos minutos." },
  //     { status: 429 }
  //   )
  // }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  // Honeypot check — respond 200 to not reveal detection
  if (typeof body === "object" && body !== null && "website" in body) {
    const honeypot = (body as Record<string, unknown>).website
    if (typeof honeypot === "string" && honeypot.length > 0) {
      return NextResponse.json({ ok: true })
    }
  }

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    const errors = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(([field, msgs]) => [
        field,
        msgs?.[0] ?? "Campo inválido",
      ])
    )
    return NextResponse.json({ errors }, { status: 400 })
  }

  const { nombre, empresa, email, telefono, asunto, mensaje } = result.data

  // Envío interno: si falla, se devuelve error al usuario
  let internalOk = false
  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [internalTo],
      replyTo: email,
      subject: `[Maxwell Web] ${asunto}`,
      text: [
        `Nombre: ${nombre}`,
        `Empresa: ${empresa || "—"}`,
        `Email: ${email}`,
        `Teléfono: ${telefono || "—"}`,
        ``,
        `Mensaje:`,
        mensaje,
      ].join("\n"),
    })

    if (error) {
      throw error
    }

    internalOk = true
    console.info("contact: internal_sent", { requestId, id: data?.id })
  } catch (err) {
    console.error("contact: internal_send_failed", { requestId, err })
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intente nuevamente." },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, requestId })
}
