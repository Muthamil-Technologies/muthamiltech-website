import { FeatureSection } from "../components/FeatureSection";
import { JapJobMockup } from "../components/mockups/JapJobMockup";
import { JapTalkMockup } from "../components/mockups/JapTalkMockup";
import { JapTestMockup } from "../components/mockups/JapTestMockup";
import { JapTourMockup } from "../components/mockups/JapTourMockup";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Ecosystem } from "../components/sections/Ecosystem";
import { EcosystemConnection } from "../components/sections/EcosystemConnection";
import { Hero } from "../components/sections/Hero";
import { Vision } from "../components/sections/Vision";
import { WhoWeBuildFor } from "../components/sections/WhoWeBuildFor";
import { products } from "../data/products";

const [japtalk, japtest, japjob, japtour] = products;

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
      />
      <FeatureSection
        product={japtest}
        heading="Prepare with purpose."
        tagline="Whether you're starting with N5 or aiming for N1, JapTest is designed to make JLPT preparation more structured and practical."
        mockup={<JapTestMockup />}
        tone="dark"
        reversed
      />
      <FeatureSection
        product={japjob}
        heading="Find your next opportunity in Japan."
        tagline="Discover jobs, understand requirements, and take the next step in your career in Japan."
        mockup={<JapJobMockup />}
      />
      <FeatureSection
        product={japtour}
        heading="Explore Japan your way."
        tagline="From weekend getaways to family holidays, plan your Japan experience with a smarter itinerary. Future: curated Japan travel experiences and packages."
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
