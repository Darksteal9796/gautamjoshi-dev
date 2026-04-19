import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Now from "@/components/Now";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Metrics />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Now />
        <Contact />
      </main>
    </>
  );
}
