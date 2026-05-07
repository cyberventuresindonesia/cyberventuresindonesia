import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudiesContent from "./CaseStudiesContent";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore how Cyber Ventures Indonesia has helped organizations strengthen their security posture and respond to cyber threats.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <CaseStudiesContent />
      </main>
      <Footer />
    </>
  );
}
