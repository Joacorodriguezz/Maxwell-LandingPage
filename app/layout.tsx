import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maxwell S.A. | Servicios de Ingeniería y Obra',
  description: 'Somos un grupo de profesionales y técnicos abocados a la elaboración de proyectos integrales de ingeniería — desde la concepción hasta la puesta en marcha. Certificados ISO 9001:2008.',
  generator: 'v0.app',
  keywords: ['ingeniería', 'obra', 'proyectos', 'La Plata', 'Buenos Aires', 'ISO 9001', 'petróleo', 'gas', 'industrial'],
  icons: {
    icon: [
      {
        url: '/logo-rueda.png',
      },
    ],
    apple: '/logo-rueda.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
