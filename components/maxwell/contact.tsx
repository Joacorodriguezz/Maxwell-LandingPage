"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { contactSchema, type ContactFormData } from "@/lib/validations/contact"

const contactEmails = [
  { area: "Administración", email: "administracion@maxwellsa.com.ar" },
  { area: "Gerencia", email: "gerencia@maxwellsa.com.ar" },
  { area: "Ingeniería", email: "ingenieria@maxwellsa.com.ar" },
  { area: "Contacto General", email: "contacto@maxwellsa.com.ar" },
  { area: "Calidad", email: "calidad@maxwellsa.com.ar" },
]

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const [headerRef, headerInView] = useInView()
  const [contentRef, contentInView] = useInView()

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
    setSubmitStatus("idle")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitStatus("success")
        reset()
      } else if (res.status === 429) {
        setSubmitStatus("error")
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    }
  }

  return (
    <section id="contacto" className="bg-[#F8F9FA] pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${headerInView ? "reveal-up" : "reveal-hidden"}`}
        >
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

        <div ref={contentRef} className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div
            className={`rounded-xl bg-white p-8 shadow-sm ${
              contentInView ? "reveal-left delay-100" : "reveal-hidden"
            }`}
          >
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
              {/* Honeypot — hidden from humans, filled by bots */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", opacity: 0, pointerEvents: "none", tabIndex: -1 }}
              >
                <label htmlFor="website">No completar</label>
                <input id="website" type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-foreground">
                    Nombre *
                  </label>
                  <Input
                    id="nombre"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.nombre}
                    {...register("nombre")}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="empresa" className="mb-2 block text-sm font-medium text-foreground">
                    Empresa
                  </label>
                  <Input
                    id="empresa"
                    placeholder="Tu empresa"
                    aria-invalid={!!errors.empresa}
                    {...register("empresa")}
                  />
                  {errors.empresa && (
                    <p className="mt-1 text-xs text-red-600">{errors.empresa.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    placeholder="Tu teléfono"
                    aria-invalid={!!errors.telefono}
                    {...register("telefono")}
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-600">{errors.telefono.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="mb-2 block text-sm font-medium text-foreground">
                  Asunto *
                </label>
                <Input
                  id="asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  aria-invalid={!!errors.asunto}
                  {...register("asunto")}
                />
                {errors.asunto && (
                  <p className="mt-1 text-xs text-red-600">{errors.asunto.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mensaje" className="mb-2 block text-sm font-medium text-foreground">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  aria-invalid={!!errors.mensaje}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-red-500"
                  {...register("mensaje")}
                />
                {errors.mensaje && (
                  <p className="mt-1 text-xs text-red-600">{errors.mensaje.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F26D21] text-white hover:bg-[#D85A15] disabled:opacity-60"
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-8 ${contentInView ? "reveal-right delay-200" : "reveal-hidden"}`}
          >
            {/* Address Card */}
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

            {/* Phone Card */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4C] text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-[#1A2B4C]">Teléfonos</h4>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Oficina:</span>{" "}
                  0221-4896360
                </p>
                <p>
                  <span className="font-medium text-foreground">Móvil:</span>{" "}
                  0221-15-4978097
                </p>
              </div>
            </div>

            {/* Emails Card */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4C] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-[#1A2B4C]">Emails por Área</h4>
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
