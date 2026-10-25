import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Ecosystem } from "../components/sections/Ecosystem";
import { Hero } from "../components/sections/Hero";

/** Company site (muthamiltech.com): who we are, the JapanOne products, contact.
 *  Consumer pages (learn, sign-in, partners) live on japanone.app. */
export function Home() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <About />
      <Contact />
    </>
  );
}
