import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cyber Ventures Indonesia - Enterprise Cybersecurity Solutions",
    template: "%s | Cyber Ventures Indonesia",
  },
  description: "PT Cyber Ventures Indonesia provides advanced cybersecurity solutions including penetration testing, vulnerability assessment, security consulting, and managed SOC services for enterprises in Indonesia.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "security consulting",
    "vulnerability assessment",
    "managed SOC",
    "incident response",
    "Indonesia",
    "enterprise security",
    "ISO 27001",
    "compliance audit",
  ],
  authors: [{ name: "Cyber Ventures Indonesia" }],
  creator: "Cyber Ventures Indonesia",
  publisher: "Cyber Ventures Indonesia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://cyberventuresindonesia.com",
    siteName: "Cyber Ventures Indonesia",
    title: "Cyber Ventures Indonesia - Enterprise Cybersecurity Solutions",
    description: "Advanced cybersecurity solutions for modern enterprises in Indonesia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Ventures Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Ventures Indonesia - Enterprise Cybersecurity Solutions",
    description: "Advanced cybersecurity solutions for modern enterprises in Indonesia",
    images: ["/og-image.jpg"],
    creator: "@cyberventuresid",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://cyberventuresindonesia.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
