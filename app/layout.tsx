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
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
