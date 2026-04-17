import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navigation />
      <main className="flex-1 relative z-10">
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}
