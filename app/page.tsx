import HeroSection from "@/components/HeroSection";
import Marquee from "react-fast-marquee";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";


export default function Home() {
  return (
    <>
      <section>
        <HeroSection />
          <MeetTheTeamSection />
      </section>
    </>
  );
}
