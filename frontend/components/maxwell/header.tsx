"use client"

import { useState, useEffect } from "react"
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

function scrollToSection(href: string, closeMenu?: () => void) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) {
    const headerHeight = document.querySelector("header")?.offsetHeight ?? 80
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: "smooth" })
  }
  closeMenu?.()
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolling, setIsScrolling] = useState(false)

  // Track active section via IntersectionObserver
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
          // Pick the section with highest visibility
          if (visibleSections.size > 0) {
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

  // Flash effect on scroll start
  const handleNavClick = (href: string, closeMenu?: () => void) => {
    setIsScrolling(true)
    setActiveSection(href.replace("#", ""))
    scrollToSection(href, closeMenu)
    setTimeout(() => setIsScrolling(false), 800)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1A2B4C] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
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
              className="h-20 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="relative hidden items-center gap-1 lg:flex">

{navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <a
                  key={link.href}
                  href={link.href}
onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {/* Active glow background */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-md bg-white/10" />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}

            <Button
              className={`relative ml-4 overflow-hidden bg-[#F26D21] text-white transition-all duration-200 hover:bg-[#D85A15] active:scale-95 ${
                isScrolling ? "brightness-110" : ""
              }`}
              onClick={() => handleNavClick("#contacto")}
            >
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
              const isActive = activeSection === link.href.replace("#", "")
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
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F26D21]" />
                  )}
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
