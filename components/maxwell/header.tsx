"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#calidad", label: "Calidad" },
]

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(targetY: number, duration = 720, onDone?: () => void) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
    else onDone?.()
  }
  requestAnimationFrame(step)
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [clickedLink, setClickedLink] = useState<string | null>(null)
  const [shrunk, setShrunk] = useState(false)
  const isUserScrolling = useRef(false)
  const lastScrollY = useRef(0)

  // Scroll progress + shrink on down
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
      setShrunk(scrollTop > lastScrollY.current && scrollTop > 80)
      lastScrollY.current = scrollTop
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""))
    const observers: IntersectionObserver[] = []
    const visibleSections = new Map<string, number>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio)
          } else {
            visibleSections.delete(id)
          }
          if (!isUserScrolling.current && visibleSections.size > 0) {
            const top = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0][0]
            setActiveSection(top)
          }
        },
        { threshold: [0, 0.25, 0.5], rootMargin: "-80px 0px -40% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback((href: string, closeMenu?: () => void) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (!el) { closeMenu?.(); return }

    const headerHeight = document.querySelector("header")?.offsetHeight ?? 80
    const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight

    setActiveSection(id)
    setClickedLink(id)
    isUserScrolling.current = true
    setTimeout(() => setClickedLink(null), 350)

    smoothScrollTo(targetY, 720, () => { isUserScrolling.current = false })
    closeMenu?.()
  }, [])

  return (
    <header
      className="sticky top-0 z-50 bg-[#1A2B4C] text-white shadow-lg"
      style={{
        transition: "height 300ms ease",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#F26D21]"
        style={{ width: `${scrollProgress * 100}%`, transition: "width 100ms linear" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between"
          style={{
            height: shrunk ? "3rem" : "5rem",
            transition: "height 300ms ease",
          }}
        >
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick("#inicio") }}
            className="flex items-center gap-2"
          >
            <Image
              src="/Maxwell.png"
              alt="Maxwell S.A."
              width={400}
              height={100}
              style={{
                height: shrunk ? "2.5rem" : "5rem",
                width: "auto",
                objectFit: "contain",
                transition: "height 300ms ease",
              }}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const isActive = activeSection === id
              const isClicked = clickedLink === id

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative overflow-hidden rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* Background highlight — slides in from bottom */}
                  <span
                    className="absolute inset-0 rounded-md bg-white/10"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(4px)",
                      transition: "opacity 250ms ease, transform 250ms ease",
                    }}
                  />

                  {/* Orange underline */}
                  <span
                    className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-[#F26D21]"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  {/* Click ripple */}
                  {isClicked && (
                    <span
                      className="absolute inset-0 rounded-md animate-ping bg-[#F26D21]/25"
                      aria-hidden
                    />
                  )}

                  <span className="relative">{link.label}</span>
                </a>
              )
            })}

            <Button
              className="relative ml-4 overflow-hidden bg-[#F26D21] text-white transition-[background-color] duration-200 hover:bg-[#D85A15] active:scale-95"
              onClick={() => handleNavClick("#contacto")}
            >
              {clickedLink === "contacto" && (
                <span className="absolute inset-0 animate-ping rounded bg-white/20" aria-hidden />
              )}
              Contactanos
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-white/10 bg-[#1A2B4C] lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href, () => setIsMenuOpen(false))
                  }}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#F26D21]"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(0)",
                      transition: "transform 200ms ease",
                    }}
                  />
                  {link.label}
                </a>
              )
            })}
            <Button
              className="mt-4 w-full bg-[#F26D21] text-white hover:bg-[#D85A15]"
              onClick={() => handleNavClick("#contacto", () => setIsMenuOpen(false))}
            >
              Contactanos
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
