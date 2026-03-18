"use client"

import { useState } from "react"
import { Award, TrendingUp, Users } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const pillars = [
  {
    icon: Award,
    num: "01",
    title: "ISO 9001:2008",
    subtitle: "Sistema de Gestión de Calidad",
    description:
      "Sistema de Gestión de Calidad bajo los lineamientos de la norma internacional ISO 9001:2008, de alcance en todo el ámbito de la organización.",
  },
  {
    icon: TrendingUp,
    num: "02",
    title: "Mejora Continua",
    subtitle: "Evolución permanente",
    description:
      "Revisión periódica y mejora continua de los distintos procesos del Sistema de Gestión de la Calidad.",
  },
  {
    icon: Users,
    num: "03",
    title: "Satisfacción del Cliente",
    subtitle: "Nuestro compromiso",
    description:
      "Aumentar permanentemente la satisfacción de los clientes, proveyendo productos y servicios con tecnología de última generación.",
  },
]

export function Quality() {
  const [headerRef] = useInView({ variant: "up" })
  const [contentRef] = useInView({ variant: "up", delay: 100 })
  const [bottomRef] = useInView({ variant: "up", delay: 50 })
  const [activeIndex, setActiveIndex] = useState(0)

  const active = pillars[activeIndex]
  const ActiveIcon = active.icon

  return (
    <section id="calidad" className="overflow-hidden bg-[#1A2B4C] pt-10 pb-14 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-[#F26D21]/20 px-4 py-1 text-sm font-semibold text-[#F26D21]">
            Política de Calidad
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Compromiso con la excelencia
          </h2>
          <p className="mt-3 text-pretty text-sm text-white/60 sm:text-base">
            Nuestra política de calidad se fundamenta en tres pilares que guían
            todas nuestras actividades y decisiones.
          </p>
        </div>

        {/* Desktop: Horizontal stepper */}
        <div ref={contentRef} className="mt-12 hidden md:block">
          {/* Step indicators with connecting line */}
          <div className="relative mx-auto flex max-w-2xl items-start justify-between">
            {/* Connecting line (background) */}
            <div className="absolute left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] top-8 h-[2px] bg-white/10" />
            {/* Connecting line (progress) */}
            <div
              className="absolute left-[calc(16.67%+2rem)] top-8 h-[2px] bg-[#F26D21] transition-all duration-500"
              style={{
                width: `${activeIndex * 50}%`,
                maxWidth: "calc(100% - 33.34% - 4rem)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              const isActive = i === activeIndex
              const isPast = i < activeIndex

              return (
                <button
                  key={pillar.title}
                  onClick={() => setActiveIndex(i)}
                  className="group relative z-10 flex flex-1 flex-col items-center gap-3"
                >
                  {/* Circle */}
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-400 ${
                      isActive
                        ? "scale-110 border-[#F26D21] bg-[#F26D21] shadow-lg shadow-[#F26D21]/30"
                        : isPast
                          ? "border-[#F26D21] bg-[#F26D21]/20"
                          : "border-white/20 bg-white/5 group-hover:border-white/40"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors duration-300 ${
                        isActive ? "text-white" : isPast ? "text-[#F26D21]" : "text-white/40 group-hover:text-white/60"
                      }`}
                    />

                    {/* Step number badge */}
                    <span
                      className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                        isActive || isPast
                          ? "bg-[#F26D21] text-white"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {pillar.num}
                    </span>
                  </div>

                  {/* Title */}
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                    }`}
                  >
                    {pillar.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div
              key={activeIndex}
              className="animate-service-fade-in rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F26D21]">
                  <ActiveIcon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{active.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#F26D21]">
                    {active.subtitle}
                  </p>
                  <p className="mt-3 leading-relaxed text-white/70">
                    {active.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical interactive timeline */}
        <div className="mt-10 md:hidden">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            const isActive = i === activeIndex
            const isPast = i < activeIndex

            return (
              <div key={pillar.title} className="relative">
                {/* Vertical line */}
                {i < pillars.length - 1 && (
                  <div
                    className={`absolute bottom-0 left-[1.1rem] top-[2.75rem] w-[2px] transition-colors duration-300 ${
                      isPast ? "bg-[#F26D21]" : "bg-white/10"
                    }`}
                  />
                )}

                <button
                  onClick={() => setActiveIndex(i)}
                  className="relative flex w-full items-center gap-4 py-3 text-left"
                >
                  {/* Circle */}
                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-[#F26D21] bg-[#F26D21]"
                        : isPast
                          ? "border-[#F26D21] bg-[#F26D21]/20"
                          : "border-white/20 bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-white" : isPast ? "text-[#F26D21]" : "text-white/40"
                      }`}
                    />
                  </div>

                  <div className="flex flex-1 items-center justify-between">
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? "text-white" : "text-white/50"
                      }`}
                    >
                      {pillar.title}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isActive ? "text-[#F26D21]" : "text-white/20"
                      }`}
                    >
                      {pillar.num}
                    </span>
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  className={`ml-[2.85rem] overflow-hidden transition-all duration-400 ${
                    isActive ? "max-h-44 pb-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                >
                  <p className="mb-1 text-xs font-medium text-[#F26D21]">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {pillar.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quality Commitment */}
        <div ref={bottomRef} className="mt-8 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-center text-sm leading-relaxed text-pretty text-white/70">
            El cumplimiento de esta política será una obligación de todos los niveles de la empresa,
            cualquiera sea su función o cargo, teniendo como misión fundamental alcanzar el bienestar
            individual y grupal de quienes la integran.
          </p>
        </div>
      </div>
    </section>
  )
}
