import { Header } from "@/components/maxwell/header"
import { Hero } from "@/components/maxwell/hero"
import { About } from "@/components/maxwell/about"
import { Services } from "@/components/maxwell/services"
import { Clients } from "@/components/maxwell/clients"
import { Quality } from "@/components/maxwell/quality"
import { Contact } from "@/components/maxwell/contact"
import { Footer } from "@/components/maxwell/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Clients />
      <Quality />
      <Contact />
      <Footer />
    </main>
  )
}
