import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { FloatingIcons } from "@/components/sections/FloatingIcons";

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative">
        <FloatingIcons />
        <main className="relative">
          <Hero />
          <Projects />
          <Skills />
          <Capabilities />
          <About />
          <Contact />
        </main>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}