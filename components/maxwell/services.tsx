"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Droplets,
  Gauge,
  Wrench,
  Zap,
  Waves,
  Building,
  ChevronLeft,
  ChevronRight,
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
  const [headerRef] = useInView({ variant: "up" })
  const [contentRef] = useInView({ variant: "up", delay: 150 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [fadeKey, setFadeKey] = useState(0)

  // Auto-rotate every 5s
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
      setFadeKey((k) => k + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [isPaused])

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    setFadeKey((k) => k + 1)
    setIsPaused(true)
  }, [])

  // Resume auto-play after 10s of inactivity
  useEffect(() => {
    if (!isPaused) return
    const id = setTimeout(() => setIsPaused(false), 10000)
    return () => clearTimeout(id)
  }, [isPaused])

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + services.length) % services.length)
  }, [activeIndex, goTo])

  const next = useCallback(() => {
    goTo((activeIndex + 1) % services.length)
  }, [activeIndex, goTo])

  const active = services[activeIndex]
  const Icon = active.icon

  return (
    <section id="servicios" className="bg-[#F8F9FA] pt-10 pb-14 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
            Gerencia de Ingeniería
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            Ofrecemos un servicio integral de ingeniería que abarca todas las
            disciplinas necesarias para el desarrollo exitoso de su proyecto.
          </p>
        </div>

        {/* Desktop: tabs + content panel */}
        <div
          ref={contentRef}
          className="mt-10 hidden md:flex gap-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left tab list */}
          <div className="flex w-56 shrink-0 flex-col gap-1.5">
            {services.map((service, i) => {
              const TabIcon = service.icon
              const isActive = i === activeIndex
              return (
                <button
                  key={service.title}
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-[#1A2B4C] text-white shadow-lg shadow-[#1A2B4C]/25"
                      : "bg-white text-[#1A2B4C] shadow-sm hover:shadow-md"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-[#F26D21]" : "bg-[#1A2B4C]/10"
                    }`}
                  >
                    <TabIcon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-[#1A2B4C]"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-semibold leading-tight">{service.title}</span>
                </button>
              )
            })}
          </div>

          {/* Right content card */}
          <div className="relative flex-1 rounded-2xl border-[3px] border-[#F26D21] p-1">
            <div className="h-full rounded-xl bg-[#1A2B4C] p-6 lg:p-8">
              <div key={fadeKey} className="flex h-full gap-6 animate-service-fade-in">
                {/* Large icon */}
                <div className="hidden lg:flex h-36 w-36 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                  <Icon className="h-16 w-16 text-white/70" strokeWidth={1.2} />
                </div>

                {/* Text content */}
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="mb-3 text-xl font-bold text-white lg:text-2xl">
                    {active.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {active.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-white/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F26D21]" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: single card carousel */}
        <div
          className="mt-10 md:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(true)}
        >
          <div className="rounded-2xl border-[3px] border-[#F26D21] p-1">
            <div className="grid">
              {services.map((service, i) => {
                const MobileIcon = service.icon
                const isActive = i === activeIndex
                return (
                  <div
                    key={service.title}
                    style={{ gridArea: "1 / 1" }}
                    className={`rounded-xl bg-[#1A2B4C] p-6 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F26D21]">
                        <MobileIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-white/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F26D21]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Navigation dots & arrows */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Servicio anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A2B4C]/60 transition-colors hover:bg-[#1A2B4C]/10 hover:text-[#1A2B4C]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a ${services[i].title}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-[#F26D21]"
                    : "w-2.5 bg-[#1A2B4C]/20 hover:bg-[#1A2B4C]/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente servicio"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A2B4C]/60 transition-colors hover:bg-[#1A2B4C]/10 hover:text-[#1A2B4C]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
