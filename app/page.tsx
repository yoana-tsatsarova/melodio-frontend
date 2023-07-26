import HeroSection from "@/components/HeroSection";
import Aboutus from "@/components/Aboutus";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import TechUsed from "@/components/TechUsed";


export default function Home() {
  return (
    <>
      <section>

        <HeroSection />

          <Aboutus />
          <Skills />
          <Works />
          <TechUsed />

      </section>
    </>
  );
}
