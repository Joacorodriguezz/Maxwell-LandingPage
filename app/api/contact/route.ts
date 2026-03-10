import { NextRequest, NextResponse } from "next/server"
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
  const ip = getClientIp(req)

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intente nuevamente en unos minutos." },
      { status: 429 }
    )
  }

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

  // TODO: Integrate mail sending here (Nodemailer / Resend / SendGrid)
  // Example with Resend:
  // await resend.emails.send({
  //   from: "no-reply@maxwellsa.com.ar",
  //   to: "contacto@maxwellsa.com.ar",
  //   subject: `[Maxwell] ${asunto}`,
  //   text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`,
  // })

  console.log("Contact form submission:", { nombre, empresa, email, telefono, asunto, mensaje })

  return NextResponse.json({ ok: true })
}
