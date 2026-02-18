import Hero from "@/components/sections/Hero";
import TrustBadges from "@/components/sections/TrustBadges";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import Expertise from "@/components/sections/Expertise";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <About />
      <Stats />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Expertise />
      <FAQ />
      <Blog />
      <CTA />
    </>
  );
}
