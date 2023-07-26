import HeroSection from "@/components/HeroSection";
import Marquee from "react-fast-marquee";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";
import Login from "@/app/Login";


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
