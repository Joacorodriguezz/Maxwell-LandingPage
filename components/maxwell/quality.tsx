"use client"

import { Award, TrendingUp, Users } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const pillars = [
  {
    icon: Award,
    title: "ISO 9001:2008",
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
  const [headerRef] = useInView({ variant: "up" })
  const [pillarsRef] = useInView({ threshold: 0.1 })
  const [bottomRef] = useInView({ variant: "up", delay: 50 })

  return (
    <section id="calidad" className="bg-[#1A2B4C] pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
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

        {/* Horizontal accordion (desktop) / vertical stack (mobile) */}
        <div ref={pillarsRef} className="quality-accordion mt-16">
          {pillars.map((pillar, i) => (
            <QualityCard key={pillar.title} pillar={pillar} delay={i * 50} />
          ))}
        </div>

        {/* Quality Commitment */}
        <div ref={bottomRef} className="mt-10 rounded-xl bg-white/5 p-6 backdrop-blur-sm">
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

function QualityCard({
  pillar,
  delay,
}: {
  pillar: (typeof pillars)[0]
  delay: number
}) {
  const [ref] = useInView({ variant: "up", delay })

  return (
    <div
      ref={ref}
      tabIndex={0}
      className="quality-card rounded-xl bg-white/5 p-6 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26D21]"
    >
      {/* Icon — always visible */}
      <div className="mb-5 inline-flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-[#F26D21] text-white">
        <pillar.icon className="h-7 w-7" />
      </div>

      {/* Title — fades in when expanded */}
      <h3 className="quality-card-title text-xl font-semibold text-white">
        {pillar.title}
      </h3>

      {/* Description — fades in + needs min-width to force card expansion */}
      <div className="quality-card-body mt-3">
        <p className="leading-relaxed text-white/70">
          {pillar.description}
        </p>
      </div>
    </div>
  )
}
