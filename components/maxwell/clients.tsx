"use client"

import { Marquee } from "@/components/marquee"
import { useInView } from "@/hooks/use-in-view"

const clients = [
  { name: "YPF S.A.", sector: "Petróleo y Gas", abbr: "YPF", color: "#1A2B4C" },
  { name: "Coop. Eléctrica Punta Indio", sector: "Energía Eléctrica", abbr: "CEPI", color: "#2563EB" },
  { name: "INDUNOR S.A.", sector: "Industria / Química", abbr: "IND", color: "#7C3AED" },
  { name: "Petroken S.A.", sector: "Petroquímica", abbr: "PKN", color: "#059669" },
  { name: "Flowserve S.A.", sector: "Industria", abbr: "FLW", color: "#DC2626" },
  { name: "Trexcin S.A.", sector: "Construcción", abbr: "TRX", color: "#D97706" },
  { name: "Tisico S.A.", sector: "Ingeniería", abbr: "TIS", color: "#0891B2" },
  { name: "DECA Electromecánica", sector: "Electromecánica", abbr: "DEC", color: "#65A30D" },
  { name: "Alsina S.A.", sector: "Construcción", abbr: "ALS", color: "#9333EA" },
  { name: "Gelvez S.R.L.", sector: "Gas / Energía", abbr: "GEL", color: "#0284C7" },
  { name: "Ford Motors Co.", sector: "Automotriz", abbr: "FRD", color: "#1D4ED8" },
  { name: "Ronza Ingeniería", sector: "Ingeniería", abbr: "RNZ", color: "#B45309" },
]

const row1 = clients.slice(0, 6)
const row2 = clients.slice(6, 12)

function ClientCard({ client }: { client: typeof clients[0] }) {
  return (
    <div className="mx-3 flex items-center gap-3 rounded-xl border border-border bg-white px-5 py-3 shadow-sm">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
        style={{ backgroundColor: client.color }}
      >
        {client.abbr}
      </div>
      <div className="flex flex-col">
        <span className="whitespace-nowrap text-sm font-semibold text-[#1A2B4C]">
          {client.name}
        </span>
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {client.sector}
        </span>
      </div>
    </div>
  )
}

export function Clients() {
  const [headerRef, headerInView] = useInView()
  const [quoteRef, quoteInView] = useInView()
  const [marqueeRef, marqueeInView] = useInView()

  return (
    <section id="clientes" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${headerInView ? "reveal-up" : "reveal-hidden"}`}
        >
          <div className="mb-4 inline-block rounded-full bg-[#F26D21]/10 px-4 py-1.5 text-sm font-semibold text-[#F26D21]">
            Nuestros Clientes
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1A2B4C] sm:text-4xl">
            Empresas que confían en nosotros
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Trabajamos con las principales empresas del sector energético,
            industrial y de construcción de Argentina.
          </p>
        </div>

        {/* Featured Quote */}
        <div
          ref={quoteRef}
          className={`mx-auto mt-12 max-w-2xl rounded-xl bg-gradient-to-br from-[#1A2B4C] to-[#2A3B5C] p-8 text-center text-white shadow-lg ${
            quoteInView ? "reveal-scale delay-200" : "reveal-hidden"
          }`}
        >
          <div className="text-5xl font-bold text-[#F26D21]">+100</div>
          <p className="mt-2 text-lg font-medium">obras realizadas para YPF S.A.</p>
          <p className="mt-1 text-sm text-white/70">
            Nuestro principal cliente desde hace más de 30 años
          </p>
        </div>

        {/* Marquee rows */}
        <div
          ref={marqueeRef}
          className={`mt-16 flex flex-col gap-4 overflow-hidden ${
            marqueeInView ? "reveal-up delay-200" : "reveal-hidden"
          }`}
        >
          <Marquee duration={35} pauseOnHover direction="left" fadeAmount={8}>
            {row1.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <Marquee duration={35} pauseOnHover direction="right" fadeAmount={8}>
            {row2.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
