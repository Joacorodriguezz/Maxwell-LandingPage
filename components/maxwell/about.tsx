"use client"

import { FileText, Settings, Clock } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const highlights = [
  {
    num: "01",
    icon: Settings,
    title: "Ingeniería Integral",
    description: "Desarrollo de ingeniería conceptual, básica y de detalle para proyectos de alta complejidad.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Documentación Técnica",
    description: "Elaboración de planos, memorias de cálculo, isométricos y toda la documentación requerida.",
  },
  {
    num: "03",
    icon: Clock,
    title: "Puesta en Marcha",
    description: "Pre-comisionado, comisionado y guardias técnicas 7x24 para asegurar la operatividad.",
  },
]

export function About() {
  const [imgRef] = useInView({ variant: "left" })
  const [textRef] = useInView({ variant: "right", delay: 80 })

  return (
    <section id="quienes-somos" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div ref={imgRef} className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img
                src="/Gemini_Generated_Image_sl115msl115msl11.png"
                alt="Equipo de ingenieros trabajando en planta industrial"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-lg bg-[#F26D21]/10" />
          </div>

          {/* Content */}
          <div ref={textRef}>
            <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
              Quiénes Somos
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
              Ingeniería y obra en campo, con equipos expertos
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Maxwell S.A. es una empresa de ingeniería y servicios con sede en La Plata,
                Buenos Aires. Acompañamos a nuestros clientes en planta, desde la concepción
                del proyecto hasta la puesta en marcha en sitio.
              </p>
              <p className="leading-relaxed">
                Nuestro equipo multidisciplinario de ingenieros y técnicos trabaja codo a codo
                en entornos industriales complejos, integrando procesos, instrumentación, mecánica,
                electricidad y obra civil para asegurar soluciones confiables y seguras.
              </p>
              <p className="leading-relaxed">
                Operamos bajo los lineamientos de la norma ISO 9001:2008, con foco en la mejora
                continua y la trazabilidad de cada etapa, garantizando la calidad de nuestros
                entregables y la satisfacción de los clientes.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        <div className="mt-20 flex flex-col divide-y divide-border">
          {highlights.map((item, i) => (
            <FeatureRow key={item.title} item={item} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureRow({
  item,
  delay,
}: {
  item: (typeof highlights)[0]
  delay: number
}) {
  const [ref] = useInView({ variant: "up", delay })

  return (
    <div
      ref={ref}
      className="group relative flex items-start gap-5 py-8 sm:gap-8"
    >
      {/* Number watermark */}
      <span
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[5rem] font-black leading-none text-[#1A2B4C]/[0.05] sm:text-[7rem]"
        aria-hidden
      >
        {item.num}
      </span>

      {/* Orange left line — expands width on hover */}
      <div
        className="mt-1 hidden h-full w-[3px] flex-none self-stretch rounded-full bg-[#F26D21] sm:block"
        style={{
          transition: "width 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Content */}
      <div className="flex flex-1 items-start gap-5">
        {/* Icon */}
        <div className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#1A2B4C] text-white transition-colors duration-200 group-hover:bg-[#F26D21]">
          <item.icon className="h-5 w-5" />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold text-[#1A2B4C]">{item.title}</h3>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}
