import Hero from "@/components/sections/Hero";
import Proof from "@/components/sections/Proof";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Proof />
      <Services />
      <Process />
      <About />
      <CTA />
    </main>
  );
}
