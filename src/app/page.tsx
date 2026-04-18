import About from "@/components/About";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Projects from "@/components/Projects";
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
      </main>
    </>
  );
}
