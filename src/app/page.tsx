import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Expertise from "@/components/sections/Expertise";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Expertise />
      <Blog />
      <Testimonials />
      <CTA />
    </>
  );
}
