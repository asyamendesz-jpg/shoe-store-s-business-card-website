import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Benefits } from '../components/Benefits'
import { Categories } from '../components/Categories'
import { ProductCatalog } from '../components/ProductCatalog'
import { WhyUs } from '../components/WhyUs'
import { Sustainable } from '../components/Sustainable'
import { Trends } from '../components/Trends'
import { Reviews } from '../components/Reviews'
import { SizeHelp } from '../components/SizeHelp'
import { FAQ } from '../components/FAQ'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Categories />
        <ProductCatalog />
        <WhyUs />
        <Sustainable />
        <Trends />
        <Reviews />
        <SizeHelp />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
