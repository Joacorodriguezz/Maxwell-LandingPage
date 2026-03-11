import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

const quickLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#calidad", label: "Calidad" },
  { href: "#contacto", label: "Contacto" },
]

export function Footer() {
  return (
    <footer className="bg-[#1A2B4C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <Image
              src="/Maxwell.png"
              alt="Maxwell S.A."
              width={400}
              height={100}
              className="h-20 w-auto object-contain"
            />
            <p className="mt-4 leading-relaxed text-white/70">
              Servicios de Ingeniería y Obra de alta complejidad. 
              Más de 10 años de experiencia en proyectos para la industria 
              del petróleo, gas, energía y construcción industrial.
            </p>
            <p className="mt-4 text-sm text-white/50">
              Representante: Ing. Eduardo J. Rodriguez
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-[#F26D21]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#F26D21]" />
                <span className="text-white/70">
                  Calle 2 #1574, Piso 8 Depto B<br />
                  La Plata, Buenos Aires
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#F26D21]" />
                <span className="text-white/70">0221-4896360</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#F26D21]" />
                <a
                  href="mailto:contacto@maxwellsa.com.ar"
                  className="text-white/70 transition-colors hover:text-[#F26D21]"
                >
                  contacto@maxwellsa.com.ar
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://www.maxwellsa.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#F26D21] hover:underline"
              >
                www.maxwellsa.com.ar
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} Maxwell S.A. Todos los derechos reservados.</p>
            <p>SGC bajo lineamientos ISO 9001:2008</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
