import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Industries />
        <Portfolio />
        <Team />
        <Process />
        <Pricing />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
