"use client"

import { Award, TrendingUp, Users } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const pillars = [
  {
    icon: Award,
    title: "Lineamientos ISO 9001:2008",
    description:
      "Sistema de Gestión de Calidad bajo los lineamientos de la norma internacional ISO 9001:2008, de alcance en todo el ámbito de la organización.",
  },
  {
    icon: TrendingUp,
    title: "Mejora Continua",
    description:
      "Revisión periódica y mejora continua de los distintos procesos del Sistema de Gestión de la Calidad.",
  },
  {
    icon: Users,
    title: "Satisfacción del Cliente",
    description:
      "Aumentar permanentemente la satisfacción de los clientes, proveyendo productos y servicios con tecnología de última generación.",
  },
]

export function Quality() {
  const [headerRef, headerInView] = useInView()
  const [pillarsRef, pillarsInView] = useInView()
  const [bottomRef, bottomInView] = useInView()

  return (
    <section id="calidad" className="bg-[#1A2B4C] pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${headerInView ? "reveal-up" : "reveal-hidden"}`}
        >
          <div className="mb-4 inline-block rounded-full bg-[#F26D21]/20 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
            Política de Calidad
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compromiso con la excelencia
          </h2>
          <p className="mt-4 text-pretty text-lg text-white/70">
            Nuestra política de calidad se fundamenta en tres pilares que guían
            todas nuestras actividades y decisiones.
          </p>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 ${
                pillarsInView ? "reveal-up" : "reveal-hidden"
              }`}
              style={pillarsInView ? { animationDelay: `${(i + 1) * 100}ms` } : undefined}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#F26D21] text-white">
                <pillar.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Commitment */}
        <div
          ref={bottomRef}
          className={`mt-16 rounded-xl bg-white/5 p-6 backdrop-blur-sm ${
            bottomInView ? "reveal-up delay-400" : "reveal-hidden"
          }`}
        >
          <p className="text-center text-pretty leading-relaxed text-white/80">
            El cumplimiento de esta política será una obligación de todos los niveles de la empresa,
            cualquiera sea su función o cargo, teniendo como misión fundamental alcanzar el bienestar
            individual y grupal de quienes la integran.
          </p>
        </div>
      </div>
    </section>
  )
}
