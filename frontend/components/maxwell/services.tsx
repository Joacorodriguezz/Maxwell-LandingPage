"use client"

import {
  Droplets,
  Gauge,
  Wrench,
  Zap,
  Waves,
  Building
} from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    icon: Droplets,
    title: "Procesos",
    items: [
      "Diagramas de bloques, PFDs y P&IDs",
      "Cálculo hidráulico de cañerías y bombas",
      "Diseño térmico de intercambiadores y aeroenfriadores",
      "Diseño de separadores",
      "Cálculo de válvulas de alivio y presión/vacío",
      "Recipientes a Presión (ASME) y Tanques (API 650)",
    ],
  },
  {
    icon: Gauge,
    title: "Instrumentación y Control",
    items: [
      "Diagramas de lazo",
      "Programación PLCs",
      "Sistemas SCADA",
      "Arquitectura de control",
      "Pre-comisionado y Comisionado",
      "Puesta en marcha",
    ],
  },
  {
    icon: Wrench,
    title: "Mecánica y Cañerías",
    items: [
      "Análisis de esfuerzos y tensiones (Pipe Stress Analysis)",
      "Estaciones de bombeo y sentinas",
      "Selección de equipos de bombeo",
      "Selección de equipos y válvulas",
      "Cálculo de consumo de aire de instrumentos",
      "Diseño de pulmón, sistema de regulación y compresión",
    ],
  },
  {
    icon: Zap,
    title: "Electricidad",
    items: [
      "Estudios de cortocircuito",
      "Flujo de carga",
      "Luminotecnia",
      "Diagramas unifilares",
      "Comisionado eléctrico",
      "Sistemas de protección",
    ],
  },
  {
    icon: Waves,
    title: "Saneamiento y Agua",
    items: [
      "Redes de agua potable",
      "Redes cloacales",
      "AWWA M11",
      "Estaciones de bombeo",
      "Tratamiento de efluentes",
      "Estudios hidráulicos",
    ],
  },
  {
    icon: Building,
    title: "Estructuras y Civil",
    items: [
      "Hormigón armado",
      "Fundaciones",
      "Obras de arte",
      "Edificios industriales",
      "Estructuras metálicas",
      "Cálculo estructural",
    ],
  },
]

export function Services() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section id="servicios" className="bg-[#F8F9FA] pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${headerInView ? "reveal-up" : "reveal-hidden"}`}
        >
          <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
            Gerencia de Ingeniería
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Ofrecemos un servicio integral de ingeniería que abarca todas las
            disciplinas necesarias para el desarrollo exitoso de su proyecto.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg ${
                gridInView ? "reveal-up" : "reveal-hidden"
              }`}
              style={gridInView ? { animationDelay: `${i * 100}ms` } : undefined}
            >
              {/* Top accent bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#1A2B4C] to-[#F26D21] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1A2B4C] text-white transition-colors group-hover:bg-[#F26D21]">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A2B4C]">
                  {service.title}
                </h3>
              </div>

              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F26D21]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
