import About from "@/components/About";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Metrics />
        <About />
      </main>
    </>
  );
}
