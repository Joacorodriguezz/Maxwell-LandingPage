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
    <section id="quienes-somos" className="bg-white pt-8 pb-12 lg:pt-10 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Image */}
          <div ref={imgRef} className="relative">
            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-muted">
              <img
                src="/Gemini_Generated_Image_sl115msl115msl11.png"
                alt="Equipo de ingenieros trabajando en planta industrial"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-lg bg-[#F26D21]/10 lg:block" />
          </div>

          {/* Content */}
          <div ref={textRef}>
            <div className="mb-3 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1 text-sm font-semibold text-[#F26D21]">
              Quiénes Somos
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-[#1A2B4C] sm:text-3xl">
              Ingeniería y obra en campo, con equipos expertos
            </h2>
            <div className="mt-3 space-y-2.5 text-sm text-muted-foreground">
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

        {/* Feature Cards — 3 columns */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  item,
  index,
}: {
  item: (typeof highlights)[0]
  index: number
}) {
  const [ref] = useInView({ variant: "up", delay: index * 60 })

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-border bg-[#F8F9FA] p-5 transition-shadow duration-300 hover:shadow-md"
    >
      {/* Number watermark */}
      <span
        className="pointer-events-none absolute -bottom-3 right-2 select-none text-[4.5rem] font-black leading-none text-[#1A2B4C]/[0.04]"
        aria-hidden
      >
        {item.num}
      </span>

      <div className="relative flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A2B4C] text-white transition-colors duration-200 group-hover:bg-[#F26D21]">
          <item.icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B4C]">{item.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}
