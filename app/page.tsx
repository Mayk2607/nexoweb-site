import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Pricing } from "@/components/sections/Pricing";
import { ExpressCard } from "@/components/sections/ExpressCard";
import { PlanComparison } from "@/components/sections/PlanComparison";
import { Niches } from "@/components/sections/Niches";
import { About } from "@/components/sections/About";
import CustomProjectBanner from "@/components/sections/CustomProjectBanner";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0a1224] selection:bg-[#1c4a8f] selection:text-white">
      <Header />
      
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <Pricing />
        <ExpressCard />
        <PlanComparison />
        <Services />
        <Process />
        <Ecosystem />
        <CustomProjectBanner />
        <Niches />
        <Portfolio />
        <Blog />
        <Suspense fallback={<div className="min-h-[480px]" aria-hidden />}>
          <Contact />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}

