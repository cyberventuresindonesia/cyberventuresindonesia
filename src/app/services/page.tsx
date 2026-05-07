import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive cybersecurity services including penetration testing, vulnerability assessment, security consulting, incident response, compliance audit, and security training for enterprises in Indonesia.",
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}
