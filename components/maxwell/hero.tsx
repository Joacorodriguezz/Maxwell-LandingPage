"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#1A2B4C]"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/95 via-[#1A2B4C]/85 to-[#1A2B4C]/70" />
      </div>

      {/* Diagonal Orange Element */}
      <div className="absolute -right-20 bottom-0 h-64 w-[600px] origin-bottom-right -skew-x-12 bg-[#F26D21]/20 md:h-80 md:w-[800px]" />
      <div className="absolute -right-10 bottom-0 h-48 w-[500px] origin-bottom-right -skew-x-12 bg-[#F26D21]/30 md:h-64 md:w-[700px]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* H1 */}
          <h1 className="hero-fade-up delay-100 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Ingeniería y Obra de{" "}
            <span className="text-[#F26D21]">Alta Complejidad</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-fade-up delay-200 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
            Somos un grupo de profesionales y técnicos abocados a la elaboración
            de proyectos integrales de ingeniería — desde la concepción hasta la
            puesta en marcha.
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#F26D21] text-lg text-white hover:bg-[#D85A15]"
            >
              <a href="#servicios" className="flex items-center gap-2">
                Conocé nuestros servicios
                <ChevronRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-lg text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#contacto">Contactanos</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-fade-up delay-400 mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div className="hero-fade-up delay-400">
              <div className="text-3xl font-bold text-[#F26D21] sm:text-4xl">+100</div>
              <div className="mt-1 text-sm text-white/60">Obras para YPF</div>
            </div>
            <div className="hero-fade-up delay-500">
              <div className="text-3xl font-bold text-white sm:text-4xl">+15</div>
              <div className="mt-1 text-sm text-white/60">Años de experiencia</div>
            </div>
            <div className="hero-fade-up delay-600">
              <div className="text-3xl font-bold text-white sm:text-4xl">ISO</div>
              <div className="mt-1 text-sm text-white/60">9001:2008</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
