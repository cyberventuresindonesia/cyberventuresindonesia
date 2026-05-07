import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Shield, 
  Terminal, 
  Server, 
  Lock, 
  AlertTriangle,
  FileText,
  ChevronRight,
  ExternalLink,
  Search,
  Code,
  Database,
  Cloud,
  Network
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation | Cyber Ventures Indonesia",
  description: "Complete documentation for Cyber Ventures security services, APIs, and best practices.",
};

const docSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics of working with Cyber Ventures",
    items: [
      { title: "Quick Start Guide", href: "#", description: "Get up and running in 5 minutes" },
      { title: "Platform Overview", href: "#", description: "Understanding our security ecosystem" },
      { title: "Authentication", href: "#", description: "API keys and authentication methods" },
    ]
  },
  {
    title: "Security Services",
    icon: Shield,
    description: "Documentation for our core security offerings",
    items: [
      { title: "Penetration Testing", href: "/services#pentest", description: "Web, mobile, and network pentesting" },
      { title: "Vulnerability Assessment", href: "/services#vuln", description: "Automated and manual scanning" },
      { title: "Incident Response", href: "/services#incident", description: "24/7 emergency response procedures" },
      { title: "Compliance Audit", href: "/services#compliance", description: "ISO 27001, PCI DSS, and more" },
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    description: "Integrate with our security APIs",
    items: [
      { title: "API Overview", href: "/api-reference", description: "Introduction to our APIs" },
      { title: "Authentication", href: "/api-reference#auth", description: "OAuth 2.0 and API keys" },
      { title: "Threat Intelligence API", href: "/api-reference#threat", description: "Real-time threat data" },
      { title: "Scanning API", href: "/api-reference#scan", description: "Automated security scanning" },
    ]
  },
  {
    title: "Infrastructure",
    icon: Server,
    description: "Technical infrastructure documentation",
    items: [
      { title: "Cloud Security", href: "#", description: "AWS, Azure, GCP security guides" },
      { title: "Network Security", href: "#", description: "Firewall and network segmentation" },
      { title: "Endpoint Protection", href: "#", description: "EDR and antivirus deployment" },
    ]
  },
  {
    title: "Best Practices",
    icon: Lock,
    description: "Security guidelines and recommendations",
    items: [
      { title: "Secure Coding", href: "#", description: "OWASP Top 10 mitigation" },
      { title: "DevSecOps", href: "#", description: "Security in CI/CD pipelines" },
      { title: "Zero Trust Architecture", href: "#", description: "Implementation guide" },
    ]
  },
  {
    title: "Compliance",
    icon: FileText,
    description: "Regulatory compliance documentation",
    items: [
      { title: "ISO 27001", href: "#", description: "Information security management" },
      { title: "PCI DSS", href: "#", description: "Payment card industry standards" },
      { title: "UU PDP", href: "#", description: "Indonesian data protection law" },
    ]
  }
];

const quickLinks = [
  { icon: Terminal, title: "CLI Tool", description: "Command-line interface", href: "#" },
  { icon: Database, title: "SDKs", description: "Python, Node.js, Go", href: "#" },
  { icon: Cloud, title: "Terraform", description: "Infrastructure as code", href: "#" },
  { icon: Network, title: "Integrations", description: "SIEM, SOAR, Ticketing", href: "#" },
];

export default function DocsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Documentation
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Security <span className="text-gradient">Documentation</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8">
                Comprehensive guides, API references, and best practices for securing your organization.
              </p>
              
              {/* Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full pl-12 pr-4 py-4 bg-bg-elevated border border-border-subtle rounded-xl text-foreground placeholder:text-text-muted focus:border-accent-cyan focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/50 transition-all"
                >
                  <link.icon className="w-8 h-8 text-accent-cyan mb-3" />
                  <h3 className="font-semibold text-foreground group-hover:text-accent-cyan transition-colors">{link.title}</h3>
                  <p className="text-sm text-text-tertiary">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docSections.map((section, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <p className="text-text-secondary mb-6">{section.description}</p>
                  <ul className="space-y-3">
                    {section.items.map((item, iIndex) => (
                      <li key={iIndex}>
                        <Link
                          href={item.href}
                          className="group/item flex items-start gap-2 text-text-secondary hover:text-accent-cyan transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-text-tertiary">{item.description}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-24 bg-bg-secondary/50 border-t border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-accent-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Help?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our technical support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="mailto:support@cyberventures.id"
                className="px-8 py-3 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors flex items-center gap-2"
              >
                support@cyberventures.id
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
