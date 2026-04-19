import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Now from "@/components/Now";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Stack from "@/components/Stack";

export default function Page() {
  return (
    <main id="main-content">
      <Hero />
      <Reveal>
        <Metrics />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Stack />
      </Reveal>
      <Reveal>
        <Now />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
