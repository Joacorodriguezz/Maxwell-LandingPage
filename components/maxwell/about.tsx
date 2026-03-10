"use client"

import { FileText, Settings, Clock } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const highlights = [
  {
    icon: Settings,
    title: "Ingeniería Integral",
    description: "Desarrollo de ingeniería conceptual, básica y de detalle para proyectos de alta complejidad.",
  },
  {
    icon: FileText,
    title: "Documentación Técnica",
    description: "Elaboración de planos, memorias de cálculo, isométricos y toda la documentación requerida.",
  },
  {
    icon: Clock,
    title: "Puesta en Marcha",
    description: "Pre-comisionado, comisionado y guardias técnicas 7x24 para asegurar la operatividad.",
  },
]

export function About() {
  const [sectionRef, sectionInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <section id="quienes-somos" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className={`relative ${sectionInView ? "reveal-left" : "reveal-hidden"}`}>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img
                src="/ingenierosEnRefineria.png"
                alt="Ingenieros en refinería"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-lg bg-[#F26D21]/10" />
          </div>

          {/* Content */}
          <div className={sectionInView ? "reveal-right delay-100" : "reveal-hidden"}>
            <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
              Quiénes Somos
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
              Profesionales comprometidos con la excelencia
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Maxwell S.A. es una empresa de ingeniería y servicios con sede en La Plata,
                Buenos Aires. Nos especializamos en el desarrollo de proyectos integrales
                para la industria del petróleo y gas, petroquímica, energía y construcción industrial.
              </p>
              <p className="leading-relaxed">
                Nuestro equipo multidisciplinario cuenta con amplia experiencia en gerenciamiento
                de ingeniería, abarcando todas las especialidades técnicas necesarias para
                llevar a cabo proyectos de alta complejidad.
              </p>
              <p className="leading-relaxed">
                Trabajamos bajo los lineamientos de la norma ISO 9001:2008, lo que nos permite garantizar la calidad
                de nuestros procesos y la satisfacción de nuestros clientes.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div ref={cardsRef} className="mt-20 grid gap-8 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className={`group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:border-[#F26D21]/30 hover:shadow-md ${
                cardsInView ? "reveal-up" : "reveal-hidden"
              }`}
              style={cardsInView ? { animationDelay: `${(i + 1) * 100}ms` } : undefined}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1A2B4C] text-white transition-colors group-hover:bg-[#F26D21]">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A2B4C]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
