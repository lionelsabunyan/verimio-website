import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Expertise from "@/components/sections/Expertise";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <div className="max-w-4xl mx-auto px-8"><div className="animated-divider" /></div>
      <HowItWorks />
      <Expertise />
      <Blog />
      <div className="max-w-4xl mx-auto px-8"><div className="animated-divider" /></div>
      <Testimonials />
      <CTA />
    </main>
  );
}
