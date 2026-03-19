import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { contactSchema } from "@/lib/validations/contact"
import { sendContactEmail, sendConfirmationEmail } from "@/lib/mail"

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "https://www.maxwellsa.com.ar"

function corsHeaders(origin: string | null) {
  const allowed = origin === ALLOWED_ORIGIN || process.env.NODE_ENV === "development"
  return {
    "Access-Control-Allow-Origin": allowed ? (origin ?? ALLOWED_ORIGIN) : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

// Handle preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin")
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

// ---------------------------------------------------------------------------
// IP Rate Limiting — Upstash Redis (3 req / 15 min)
// Falls back gracefully if Redis is not configured (local dev).
// ---------------------------------------------------------------------------
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, "15 m"),
        analytics: false,
      })
    : null

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile verification
// ---------------------------------------------------------------------------
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    // Not configured — skip in dev, fail in prod
    if (process.env.NODE_ENV === "production") return false
    return true
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      }
    )
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID()
  const origin = req.headers.get("origin")
  const headers = corsHeaders(origin)

  // --- CORS origin check ---------------------------------------------------
  if (
    process.env.NODE_ENV === "production" &&
    origin !== ALLOWED_ORIGIN
  ) {
    console.warn("contact: cors_rejected", { requestId, origin })
    return NextResponse.json(
      { error: "Origen no permitido." },
      { status: 403, headers }
    )
  }

  // --- Rate limiting (Upstash) ---------------------------------------------
  const ip = getClientIp(req)

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      console.warn("contact: rate_limit_exceeded", { requestId, ip })
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intente nuevamente en 15 minutos." },
        { status: 429, headers }
      )
    }
  }

  // --- Parse body ----------------------------------------------------------
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Solicitud inválida." },
      { status: 400, headers }
    )
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Solicitud inválida." },
      { status: 400, headers }
    )
  }

  const raw = body as Record<string, unknown>

  // --- Honeypot ------------------------------------------------------------
  if (typeof raw.website === "string" && raw.website.length > 0) {
    console.warn("contact: honeypot_triggered", { requestId, ip })
    return NextResponse.json({ ok: true }, { headers })
  }

  // --- Turnstile verification ----------------------------------------------
  const turnstileToken = typeof raw.turnstileToken === "string" ? raw.turnstileToken : ""

  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Verificación de seguridad requerida." },
      { status: 400, headers }
    )
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip)
  if (!turnstileOk) {
    console.warn("contact: turnstile_failed", { requestId, ip })
    return NextResponse.json(
      { error: "La verificación de seguridad falló. Intentá nuevamente." },
      { status: 400, headers }
    )
  }

  // --- Validate with Zod --------------------------------------------------
  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    const errors = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(([field, msgs]) => [
        field,
        msgs?.[0] ?? "Campo inválido",
      ])
    )
    return NextResponse.json({ errors }, { status: 400, headers })
  }

  const { nombre, empresa, email, telefono, asunto, mensaje } = result.data

  // --- Send emails ---------------------------------------------------------
  try {
    await Promise.all([
      sendContactEmail({ nombre, empresa, email, telefono, asunto, mensaje }),
      sendConfirmationEmail({ nombre, email }),
    ])
    console.info("contact: emails_sent", { requestId, to: process.env.CONTACT_TO, confirmationTo: email })
  } catch (err) {
    console.error("contact: send_failed", { requestId, err })
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intente nuevamente." },
      { status: 500, headers }
    )
  }

  return NextResponse.json({ ok: true, requestId }, { headers })
}
