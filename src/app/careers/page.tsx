import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | Cyber Ventures Indonesia",
  description: "Join our team of cybersecurity experts. Explore career opportunities at Cyber Ventures Indonesia.",
};

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <CareersContent />
      </main>
      <Footer />
    </>
  );
}
