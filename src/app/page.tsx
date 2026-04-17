import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}
