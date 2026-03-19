"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { useInView } from "@/hooks/use-in-view"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact"

const contactEmails = [
  { area: "Contacto General", email: "contacto@maxwellsa.com.ar" },
]

// Floating-label field wrapper
function FloatField({
  id,
  label,
  required,
  error,
  children,
  isTextarea,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  isTextarea?: boolean
}) {
  return (
    <div>
      <div className={`field-wrap${isTextarea ? " textarea-wrap" : ""}`}>
        {children}
        <label htmlFor={id} className="float-label">
          {label}{required ? " *" : ""}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const [headerRef] = useInView({ variant: "up" })
  const [formRef] = useInView({ variant: "left", delay: 80 })
  const [infoRef] = useInView({ variant: "right", delay: 120 })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) return
    setSubmitStatus("idle")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      })

      if (res.ok) {
        setSubmitStatus("success")
        reset()
        turnstileRef.current?.reset()
        setTurnstileToken(null)
      } else {
        setSubmitStatus("error")
        turnstileRef.current?.reset()
        setTurnstileToken(null)
      }
    } catch {
      setSubmitStatus("error")
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 pb-2 pt-5 text-sm placeholder-transparent focus:outline-none focus:border-[#F26D21] focus:ring-0 aria-[invalid=true]:border-red-500 transition-[border-color] duration-200"

  return (
    <section id="contacto" className="bg-[#F8F9FA] pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
            Contacto
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
            Trabajemos juntos
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Contáctenos para discutir su próximo proyecto de ingeniería.
            Estaremos encantados de ayudarle.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div ref={formRef} className="rounded-xl bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-[#1A2B4C]">
              Envíanos un mensaje
            </h3>

            {submitStatus === "success" && (
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-800">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">
                  Gracias por contactarnos. Nos comunicaremos a la brevedad.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-800">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">
                  Ocurrió un error al enviar el mensaje. Por favor, intentá nuevamente.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Honeypot */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
              >
                <label htmlFor="website">No completar</label>
                <input id="website" type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FloatField id="nombre" label="Nombre" required error={errors.nombre?.message}>
                  <input
                    id="nombre"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.nombre}
                    className={inputCls}
                    {...register("nombre")}
                  />
                </FloatField>
                <FloatField id="empresa" label="Empresa" error={errors.empresa?.message}>
                  <input
                    id="empresa"
                    placeholder="Tu empresa"
                    aria-invalid={!!errors.empresa}
                    className={inputCls}
                    {...register("empresa")}
                  />
                </FloatField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FloatField id="email" label="Email" required error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                    className={inputCls}
                    {...register("email")}
                  />
                </FloatField>
                <FloatField id="telefono" label="Teléfono" error={errors.telefono?.message}>
                  <input
                    id="telefono"
                    placeholder="Tu teléfono"
                    aria-invalid={!!errors.telefono}
                    className={inputCls}
                    {...register("telefono")}
                  />
                </FloatField>
              </div>

              <FloatField id="asunto" label="Asunto" required error={errors.asunto?.message}>
                <input
                  id="asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  aria-invalid={!!errors.asunto}
                  className={inputCls}
                  {...register("asunto")}
                />
              </FloatField>

              <FloatField id="mensaje" label="Mensaje" required error={errors.mensaje?.message} isTextarea>
                <textarea
                  id="mensaje"
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  aria-invalid={!!errors.mensaje}
                  className="w-full rounded-md border border-input bg-background px-3 pb-2 pt-6 text-sm placeholder-transparent focus:outline-none focus:border-[#F26D21] focus:ring-0 aria-[invalid=true]:border-red-500 transition-[border-color] duration-200"
                  {...register("mensaje")}
                />
              </FloatField>

              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
                onSuccess={setTurnstileToken}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "light", language: "es" }}
              />

              <button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-md bg-[#F26D21] px-4 py-2.5 text-sm font-medium text-white transition-[background-color] duration-200 hover:bg-[#D85A15] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4C] text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-[#1A2B4C]">Dirección</h4>
              </div>
              <p className="text-muted-foreground">
                Calle 2 #1574, Piso 8 Depto B<br />
                La Plata, Buenos Aires<br />
                CP B1904CGH
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4C] text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-[#1A2B4C]">Teléfonos</h4>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">Oficina:</span> 0221-4896360</p>
                <p><span className="font-medium text-foreground">Móvil:</span> 0221-15-4978097</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4C] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-[#1A2B4C]">Email de Contacto</h4>
              </div>
              <div className="space-y-2">
                {contactEmails.map((item) => (
                  <div key={item.email} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.area}:</span>
                    <a
                      href={`mailto:${item.email}`}
                      className="font-medium text-[#F26D21] hover:underline"
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
