import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Search, 
  FileSearch, 
  Siren, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  Target,
  Clock,
  Users,
  Lock,
  Server,
  Globe
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive cybersecurity services including penetration testing, vulnerability assessment, security consulting, incident response, compliance audit, and security training for enterprises in Indonesia.",
};

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    shortDesc: "Simulate real-world attacks to identify vulnerabilities",
    fullDesc: "Our certified ethical hackers conduct comprehensive penetration tests to identify security weaknesses before malicious actors can exploit them. We simulate real-world attack scenarios across your network, applications, and infrastructure.",
    features: [
      "Network & Infrastructure Testing",
      "Web Application Security",
      "Mobile Application Testing",
      "Social Engineering Assessment",
      "Wireless Network Testing",
      "Physical Security Review"
    ],
    benefits: [
      "Identify vulnerabilities before attackers do",
      "Validate security controls effectiveness",
      "Meet compliance requirements",
      "Receive actionable remediation guidance"
    ],
    process: [
      { step: "1", title: "Reconnaissance", desc: "Information gathering and scope definition" },
      { step: "2", title: "Scanning", desc: "Vulnerability identification and mapping" },
      { step: "3", title: "Exploitation", desc: "Controlled attack simulation" },
      { step: "4", title: "Reporting", desc: "Detailed findings and remediation plan" }
    ],
    iconColor: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30"
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    shortDesc: "Systematic scanning and analysis of security weaknesses",
    fullDesc: "Comprehensive vulnerability scanning and analysis using industry-leading tools and manual verification to identify security weaknesses, misconfigurations, and potential attack vectors in your infrastructure.",
    features: [
      "Automated Vulnerability Scanning",
      "Manual Verification",
      "Risk Prioritization",
      "Patch Management Guidance",
      "Continuous Monitoring Setup",
      "Trend Analysis"
    ],
    benefits: [
      "Proactive threat identification",
      "Reduced attack surface",
      "Compliance alignment",
      "Prioritized remediation roadmap"
    ],
    process: [
      { step: "1", title: "Discovery", desc: "Asset inventory and scope mapping" },
      { step: "2", title: "Scanning", desc: "Automated and manual testing" },
      { step: "3", title: "Analysis", desc: "Risk scoring and validation" },
      { step: "4", title: "Reporting", desc: "Executive and technical reports" }
    ],
    iconColor: "text-accent-teal",
    bgColor: "bg-accent-teal/10",
    borderColor: "border-accent-teal/30"
  },
  {
    icon: FileSearch,
    title: "Security Consulting",
    shortDesc: "Strategic guidance for robust security postures",
    fullDesc: "Expert cybersecurity consulting to help your organization build, maintain, and improve security programs. We provide strategic guidance tailored to your business objectives and risk landscape.",
    features: [
      "Security Architecture Review",
      "Policy Development",
      "Risk Assessment",
      "Security Program Design",
      "Vendor Security Assessment",
      "M&A Security Due Diligence"
    ],
    benefits: [
      "Aligned security with business goals",
      "Reduced long-term security costs",
      "Improved security maturity",
      "Strategic risk management"
    ],
    process: [
      { step: "1", title: "Assessment", desc: "Current state evaluation" },
      { step: "2", title: "Strategy", desc: "Security roadmap development" },
      { step: "3", title: "Implementation", desc: "Guided security improvements" },
      { step: "4", title: "Review", desc: "Effectiveness measurement" }
    ],
    iconColor: "text-accent-cobalt",
    bgColor: "bg-accent-cobalt/10",
    borderColor: "border-accent-cobalt/30"
  },
  {
    icon: Siren,
    title: "Incident Response",
    shortDesc: "24/7 emergency response to security breaches",
    fullDesc: "Rapid incident response services to contain security breaches, minimize damage, preserve evidence, and restore operations. Our team is available 24/7 to respond to security incidents of any scale.",
    features: [
      "24/7 Emergency Hotline",
      "Rapid Containment",
      "Digital Forensics",
      "Malware Analysis",
      "Recovery Support",
      "Post-Incident Review"
    ],
    benefits: [
      "Minimize breach impact",
      "Preserve forensic evidence",
      "Fast recovery time",
      "Prevent recurrence"
    ],
    process: [
      { step: "1", title: "Detection", desc: "Incident identification and triage" },
      { step: "2", title: "Containment", desc: "Limit scope and impact" },
      { step: "3", title: "Eradication", desc: "Remove threat actor" },
      { step: "4", title: "Recovery", desc: "Restore normal operations" }
    ],
    iconColor: "text-danger",
    bgColor: "bg-danger/10",
    borderColor: "border-danger/30"
  },
  {
    icon: CheckCircle,
    title: "Compliance Audit",
    shortDesc: "Assessment against ISO 27001, PCI DSS, and standards",
    fullDesc: "Comprehensive compliance assessments to evaluate your organization's adherence to industry standards and regulations. We help you achieve and maintain compliance with ISO 27001, PCI DSS, and other frameworks.",
    features: [
      "ISO 27001 Assessment",
      "PCI DSS Compliance",
      "Government Standards",
      "Gap Analysis",
      "Remediation Planning",
      "Audit Support"
    ],
    benefits: [
      "Meet regulatory requirements",
      "Avoid penalties and fines",
      "Build customer trust",
      "Improve security posture"
    ],
    process: [
      { step: "1", title: "Scoping", desc: "Define compliance requirements" },
      { step: "2", title: "Assessment", desc: "Current state evaluation" },
      { step: "3", title: "Gap Analysis", desc: "Identify compliance gaps" },
      { step: "4", title: "Roadmap", desc: "Remediation plan creation" }
    ],
    iconColor: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30"
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    shortDesc: "Customized awareness programs for organizations",
    fullDesc: "Comprehensive security awareness training programs tailored to your organization's needs. We help build a security-conscious culture through engaging training, simulations, and certification preparation.",
    features: [
      "Security Awareness Training",
      "Phishing Simulations",
      "Certification Preparation",
      "Executive Briefings",
      "Role-Based Training",
      "Security Culture Programs"
    ],
    benefits: [
      "Reduce human risk factor",
      "Meet compliance training requirements",
      "Empower employees",
      "Create security culture"
    ],
    process: [
      { step: "1", title: "Assessment", desc: "Training needs analysis" },
      { step: "2", title: "Design", desc: "Custom curriculum development" },
      { step: "3", title: "Delivery", desc: "Interactive training sessions" },
      { step: "4", title: "Measurement", desc: "Effectiveness evaluation" }
    ],
    iconColor: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30"
  }
];

const stats = [
  { icon: Target, value: "100+", label: "Projects Completed" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: Users, value: "50+", label: "Expert Consultants" },
  { icon: Shield, value: "99.9%", label: "Client Satisfaction" }
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Enterprise Security <span className="text-gradient">Solutions</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                Comprehensive cybersecurity services tailored to protect your organization 
                from evolving threats and ensure regulatory compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/50 transition-all duration-300"
                >
                  {/* Service Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">{service.title}</h2>
                      <p className="text-text-secondary">{service.shortDesc}</p>
                    </div>
                  </div>

                  {/* Full Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-accent-teal flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Target className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                      Our Process
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {service.process.map((step, sIndex) => (
                        <div key={sIndex} className="text-center p-3 rounded-lg bg-bg-tertiary">
                          <div className="w-8 h-8 rounded-full bg-accent-cyan/20 text-accent-cyan font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                            {step.step}
                          </div>
                          <div className="text-sm font-medium text-foreground mb-1">{step.title}</div>
                          <div className="text-xs text-text-muted">{step.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-background font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Industries We Serve
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                We provide specialized security solutions across various industries, 
                understanding unique regulatory requirements and threat landscapes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Server, name: "Technology", desc: "SaaS, Cloud, Data Centers" },
                { icon: Lock, name: "Financial", desc: "Banking, Insurance, Fintech" },
                { icon: Globe, name: "Government", desc: "Public Sector, Defense" },
                { icon: Users, name: "Healthcare", desc: "Hospitals, Pharma" },
              ].map((industry, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-bg-elevated border border-border-subtle text-center hover:border-accent-cyan/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <industry.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                  <p className="text-sm text-text-tertiary">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Secure Your Organization?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Contact us today for a free consultation and discover how we can help 
              protect your business from cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors glow-cyan"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="/about"
                className="px-8 py-4 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
