"use client";

import { Shield, Search, FileSearch, Siren, GraduationCap, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    description: "Comprehensive security assessments simulating real-world attacks to identify vulnerabilities before malicious actors do.",
    features: ["Network & Web App Testing", "Social Engineering", "Detailed Reports"],
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description: "Systematic scanning and analysis of your infrastructure to discover security weaknesses and misconfigurations.",
    features: ["Automated Scanning", "Risk Prioritization", "Remediation Guidance"],
  },
  {
    icon: FileSearch,
    title: "Security Consulting",
    description: "Strategic cybersecurity guidance to help your organization build and maintain robust security postures.",
    features: ["Security Architecture", "Policy Development", "Risk Assessment"],
  },
  {
    icon: Siren,
    title: "Incident Response",
    description: "24/7 emergency response services to contain breaches, minimize damage, and restore operations quickly.",
    features: ["Rapid Response", "Forensic Analysis", "Recovery Support"],
  },
  {
    icon: CheckCircle,
    title: "Compliance Audit",
    description: "Expert assessment of your compliance with ISO 27001, PCI DSS, and other regulatory frameworks.",
    features: ["ISO 27001", "PCI DSS", "Government Standards"],
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    description: "Customized security awareness programs to educate your workforce and build a security-conscious culture.",
    features: ["Phishing Simulation", "Awareness Training", "Certification Prep"],
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Enterprise Security <span className="text-gradient">Solutions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Comprehensive cybersecurity services tailored to protect your organization 
            from evolving threats and ensure regulatory compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-6 group-hover:bg-accent-cyan/20 transition-colors">
                <service.icon className="w-7 h-7 text-accent-cyan" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-text-tertiary">
                    <CheckCircle className="w-4 h-4 text-accent-teal flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
