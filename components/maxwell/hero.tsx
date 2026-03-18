"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

// Animated counter
function useCounter(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setValue(target); return }

    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target, duration])

  return value
}

function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  active,
  delay = 0,
}: {
  value: number | null
  prefix?: string
  suffix?: string
  label: string
  active: boolean
  delay?: number
}) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [active, delay])

  const count = useCounter(value ?? 0, started)

  return (
    <div>
      <div className="text-3xl font-bold text-[#F26D21] sm:text-4xl">
        {prefix}
        {value !== null ? count : "ISO"}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  )
}

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [statsRef, statsInView] = useInView({ threshold: 0.3 })

  // Parallax on scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    function onScroll() {
      if (!bgRef.current) return
      const y = window.scrollY * 0.35
      bgRef.current.style.transform = `translateY(${y}px)`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#1A2B4C]"
    >
      {/* Background Image — parallax wrapper */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B4C]/95 via-[#1A2B4C]/85 to-[#1A2B4C]/70" />
      </div>

      {/* Diagonal Orange Elements — animated entrance */}
      <div
        className="absolute -right-20 bottom-0 h-64 w-[600px] origin-bottom-right -skew-x-12 bg-[#F26D21]/20 md:h-80 md:w-[800px]"
        style={{
          animation: "diagonal-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
        }}
      />
      <div
        className="absolute -right-10 bottom-0 h-48 w-[500px] origin-bottom-right -skew-x-12 bg-[#F26D21]/30 md:h-64 md:w-[700px]"
        style={{
          animation: "diagonal-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* H1 */}
          <h1
            className="hero-fade-up text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Ingeniería y Obra de{" "}
            <span className="text-[#F26D21]">Alta Complejidad</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl"
            style={{ animationDelay: "150ms" }}
          >
            Somos un grupo de profesionales y técnicos abocados a la elaboración
            de proyectos integrales de ingeniería — desde la concepción hasta la
            puesta en marcha.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "200ms" }}
          >
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

          {/* Stats — counter animation */}
          <div
            ref={statsRef}
            className="hero-fade-up mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
            style={{ animationDelay: "250ms" }}
          >
            <StatCounter value={100} prefix="+" label="Obras para YPF" active={statsInView} delay={0} />
            <StatCounter value={15} prefix="+" label="Años de experiencia" active={statsInView} delay={50} />
            <StatCounter value={null} label="9001:2008" active={statsInView} delay={100} />
          </div>
        </div>
      </div>
    </section>
  )
}
