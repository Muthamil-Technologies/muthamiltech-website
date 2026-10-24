import { FeatureSection } from "../components/FeatureSection";
import { JapWorkMockup } from "../components/mockups/JapWorkMockup";
import { JapTalkMockup } from "../components/mockups/JapTalkMockup";
import { JapTutorMockup } from "../components/mockups/JapTutorMockup";
import { JapTourMockup } from "../components/mockups/JapTourMockup";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Ecosystem } from "../components/sections/Ecosystem";
import { EcosystemConnection } from "../components/sections/EcosystemConnection";
import { Hero } from "../components/sections/Hero";
import { Vision } from "../components/sections/Vision";
import { WhoWeBuildFor } from "../components/sections/WhoWeBuildFor";
import { products } from "../data/products";

const [japtalk, japtutor, japwork, japtour] = products;

export function Home() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <EcosystemConnection />

      <FeatureSection
        product={japtalk}
        heading="Start with Japanese."
        tagline="Japanese becomes easier when you can practice it in the situations that actually matter."
        mockup={<JapTalkMockup />}
        tryLink={{ to: "/japtalk/level-check", label: "Check your level" }}
      />
      <FeatureSection
        product={japtutor}
        heading="Prepare with purpose."
        tagline="From N5 to N3, JapTutor turns your exam date into a daily plan, so JLPT preparation is structured and practical."
        mockup={<JapTutorMockup />}
        tone="dark"
        reversed
        tryLink={{ to: "/japtutor/plan-builder", label: "Build your plan" }}
      />
      <FeatureSection
        product={japwork}
        heading="Work in Japan, step by step."
        tagline="Find your route into a skilled job, prepare your Japanese CV and interview, and know your rights at work."
        mockup={<JapWorkMockup />}
      />
      <FeatureSection
        product={japtour}
        heading="Explore Japan your way."
        tagline="From weekend getaways to family ski trips, plan your Japan trip with an itinerary that works offline."
        mockup={<JapTourMockup />}
        tone="dark"
        reversed
      />

      <Vision />
      <WhoWeBuildFor />
      <About />
      <Contact />
    </>
  );
}
