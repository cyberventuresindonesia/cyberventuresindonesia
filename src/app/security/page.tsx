import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Lock, 
  Server, 
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Globe,
  Key,
  Eye,
  Database,
  Clock,
  Zap,
  Award
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security | Cyber Ventures Indonesia",
  description: "Learn about our security practices, certifications, and commitment to protecting your data.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Data Encryption",
    description: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We employ end-to-end encryption for sensitive communications."
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Our infrastructure runs on enterprise-grade cloud providers with SOC 2 Type II compliance. Multi-region redundancy ensures high availability."
  },
  {
    icon: Key,
    title: "Access Control",
    description: "Role-based access control (RBAC) with least privilege principles. Multi-factor authentication (MFA) required for all administrative access."
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "24/7 security monitoring with real-time threat detection. Automated alerting and incident response procedures in place."
  },
  {
    icon: Database,
    title: "Data Protection",
    description: "Regular automated backups with point-in-time recovery. Data retention policies compliant with Indonesian data protection laws (UU PDP)."
  },
  {
    icon: Clock,
    title: "Incident Response",
    description: "Dedicated security team with established incident response procedures. Average response time under 15 minutes for critical alerts."
  }
];

const certifications = [
  { name: "ISO 27001", description: "Information Security Management", status: "Certified" },
  { name: "ISO 27017", description: "Cloud Security", status: "Certified" },
  { name: "ISO 27018", description: "Personal Data Protection", status: "Certified" },
  { name: "SOC 2 Type II", description: "Service Organization Controls", status: "Certified" },
  { name: "PCI DSS", description: "Payment Card Industry", status: "Level 1" },
];

const securityStats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "24/7", label: "Security Monitoring" },
  { value: "<15min", label: "Incident Response" },
  { value: "256-bit", label: "Encryption Standard" }
];

export default function SecurityPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Security First
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Enterprise-Grade <span className="text-gradient">Security</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8">
                Security is at the core of everything we do. Learn about our comprehensive 
                security program designed to protect your data and maintain trust.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {securityStats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-bg-elevated border border-border-subtle text-center">
                  <div className="text-2xl font-bold text-accent-cyan">{stat.value}</div>
                  <div className="text-xs text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-24 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Security Features
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Multi-layered security approach protecting your data at every layer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-accent-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Industry Certifications
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  We maintain the highest industry standards and are regularly audited by 
                  independent third parties to ensure compliance with international security standards.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent-indigo/20 flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-accent-indigo" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-success" />
                    </div>
                  </div>
                  <span className="text-text-secondary text-sm">
                    5+ Industry Certifications
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
                >
                  Request Compliance Reports
                </Link>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-bg-elevated border border-border-subtle"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{cert.name}</h3>
                        <p className="text-sm text-text-secondary">{cert.description}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Process */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Security Process
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Continuous security improvement through systematic processes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Eye, title: "Monitor", description: "24/7 security monitoring and threat detection" },
                { icon: AlertTriangle, title: "Detect", description: "Real-time threat identification and analysis" },
                { icon: Zap, title: "Respond", description: "Rapid incident response and containment" },
                { icon: CheckCircle, title: "Improve", description: "Continuous security enhancement" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vulnerability Disclosure */}
        <section className="py-24 bg-bg-secondary/50 border-t border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-accent-cyan" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Responsible Disclosure
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                We believe in transparency and collaboration with the security community. 
                If you discover a vulnerability, please report it responsibly.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-bg-elevated border border-border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">How to Report</h3>
                  <ul className="space-y-3 text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      Email security@cyberventures.id
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      Include detailed description and steps to reproduce
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      Allow reasonable time for remediation before public disclosure
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      Act in good faith and avoid privacy violations
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Our Commitment</h3>
                  <ul className="space-y-3 text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      Acknowledge receipt within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      Provide timeline for remediation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      Recognize researchers in our Hall of Fame
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      No legal action against good faith researchers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Questions About Security?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Our security team is here to help. Contact us for security inquiries, 
              compliance reports, or vulnerability reports.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
              >
                Contact Security Team
              </Link>
              <a
                href="mailto:security@cyberventures.id"
                className="px-8 py-3 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                security@cyberventures.id
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
