import Hero from "@/components/home/Hero";
import WhyChoose from "@/components/home/WhyChoose";
import HowItWorks from "@/components/home/HowItWorks";
import Opportunities from "@/components/home/Opportunities";
import Testimonial from "@/components/home/Testimonial";
import FinalCTA from "@/components/home/FinalCTA";
import LiveActivity from "@/components/home/LiveActivity";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <Opportunities />
      <Testimonial />
      <FinalCTA />
      <LiveActivity />
    </>
  );
}
