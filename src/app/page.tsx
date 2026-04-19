import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Now from "@/components/Now";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import Stack from "@/components/Stack";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <TopBar />
      <main>
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
      <Footer />
    </>
  );
}
