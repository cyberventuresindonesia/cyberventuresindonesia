import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PT Cyber Ventures Indonesia - our mission, values, team of expert cybersecurity professionals, and commitment to protecting organizations across Indonesia.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
