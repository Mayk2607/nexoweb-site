import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Pricing } from "@/components/sections/Pricing";
import { Niches } from "@/components/sections/Niches";
import { About } from "@/components/sections/About";
import CustomProjectBanner from "@/components/sections/CustomProjectBanner";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0a1224] selection:bg-[#1c4a8f] selection:text-white">
      <Header />
      
      <div className="pt-8">
        <Hero />
        <About />
        <Services />
        <Process />
        <Ecosystem />
        <Pricing />
        <CustomProjectBanner />
        <Niches />
        <Portfolio />
        <Blog />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
