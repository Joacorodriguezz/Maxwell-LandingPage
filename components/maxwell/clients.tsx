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
    <div className="client-card mx-3 flex items-center gap-3 rounded-xl border border-border bg-white px-5 py-3 shadow-sm transition-transform duration-200">
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
  const [headerRef] = useInView({ variant: "up" })
  const [ypfRef] = useInView({ variant: "up", delay: 80 })
  const [marqueeRef] = useInView({ variant: "up", delay: 120, threshold: 0.1 })

  return (
    <section id="clientes" className="bg-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
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

        {/* YPF Feature Block — redesigned as marquee-of-number band */}
        <div ref={ypfRef} className="mx-auto mt-12 max-w-3xl">
          <div className="flex items-stretch overflow-hidden rounded-xl border border-[#F26D21]/20 bg-white shadow-sm">
            {/* Left thick orange border */}
            <div className="w-2 flex-none bg-[#F26D21]" />

            <div className="flex flex-1 flex-col justify-center gap-1 px-8 py-8 sm:flex-row sm:items-center sm:gap-10">
              {/* Big number */}
              <div
                className="flex-none font-black leading-none text-[#1A2B4C]"
                style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}
                aria-label="Más de 100 obras"
              >
                <span className="text-[#F26D21]">+</span>100
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold text-[#1A2B4C] sm:text-2xl">
                  obras realizadas para YPF S.A.
                </p>
                <p className="text-sm text-muted-foreground">
                  Nuestro principal cliente desde hace más de 30 años
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee rows */}
        <div
          ref={marqueeRef}
          className="mt-16 flex flex-col gap-4 overflow-hidden"
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
