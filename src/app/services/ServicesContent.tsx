'use client';

import { motion } from "framer-motion";
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
  Globe,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    shortDesc: "Identify vulnerabilities before attackers do",
    fullDesc: "Our certified ethical hackers simulate real-world attacks to identify security weaknesses in your applications, networks, and infrastructure. We provide detailed reports with actionable remediation steps.",
    features: [
      "Web & Mobile App Testing",
      "Network Penetration Testing",
      "API Security Assessment",
      "Cloud Infrastructure Testing",
      "Social Engineering Tests",
      "Wireless Network Testing"
    ],
    benefits: [
      "Identify vulnerabilities before attackers",
      "Meet compliance requirements",
      "Validate security controls",
      "Prioritize remediation efforts"
    ],
    process: [
      { step: "1", title: "Reconnaissance", desc: "Information gathering" },
      { step: "2", title: "Scanning", desc: "Vulnerability detection" },
      { step: "3", title: "Exploitation", desc: "Controlled attacks" },
      { step: "4", title: "Reporting", desc: "Findings & remediation" }
    ],
    iconColor: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30"
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    shortDesc: "Comprehensive security scanning and analysis",
    fullDesc: "Systematic identification and quantification of security vulnerabilities in your IT infrastructure. We use automated tools and manual verification to ensure complete coverage.",
    features: [
      "Automated Vulnerability Scanning",
      "Manual Verification",
      "Risk Prioritization",
      "Remediation Guidance",
      "False Positive Filtering",
      "Continuous Monitoring"
    ],
    benefits: [
      "Discover unknown vulnerabilities",
      "Reduce attack surface",
      "Maintain security posture",
      "Support compliance audits"
    ],
    process: [
      { step: "1", title: "Discovery", desc: "Asset inventory" },
      { step: "2", title: "Assessment", desc: "Vulnerability scan" },
      { step: "3", title: "Analysis", desc: "Risk evaluation" },
      { step: "4", title: "Reporting", desc: "Actionable insights" }
    ],
    iconColor: "text-accent-indigo",
    bgColor: "bg-accent-indigo/10",
    borderColor: "border-accent-indigo/30"
  },
  {
    icon: FileSearch,
    title: "Security Consulting",
    shortDesc: "Strategic security guidance and planning",
    fullDesc: "Expert advisory services to help you build and mature your security program. From security architecture reviews to policy development, we guide you every step of the way.",
    features: [
      "Security Architecture Review",
      "Policy Development",
      "Risk Assessments",
      "Security Roadmap",
      "Vendor Security Assessment",
      "Due Diligence Support"
    ],
    benefits: [
      "Build security strategy",
      "Align security with business",
      "Reduce long-term risks",
      "Accelerate security maturity"
    ],
    process: [
      { step: "1", title: "Assessment", desc: "Current state" },
      { step: "2", title: "Strategy", desc: "Gap analysis" },
      { step: "3", title: "Planning", desc: "Roadmap creation" },
      { step: "4", title: "Support", desc: "Implementation" }
    ],
    iconColor: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/30"
  },
  {
    icon: Siren,
    title: "Incident Response",
    shortDesc: "24/7 emergency response and forensics",
    fullDesc: "Rapid response to security incidents with expert investigation, containment, and recovery services. Available 24/7 for critical security emergencies.",
    features: [
      "24/7 Emergency Hotline",
      "Incident Investigation",
      "Digital Forensics",
      "Malware Analysis",
      "Threat Containment",
      "Recovery Support"
    ],
    benefits: [
      "Minimize incident impact",
      "Preserve evidence",
      "Rapid containment",
      "Prevent recurrence"
    ],
    process: [
      { step: "1", title: "Detection", desc: "Alert validation" },
      { step: "2", title: "Response", desc: "Immediate action" },
      { step: "3", title: "Analysis", desc: "Root cause" },
      { step: "4", title: "Recovery", desc: "Restore & harden" }
    ],
    iconColor: "text-danger",
    bgColor: "bg-danger/10",
    borderColor: "border-danger/30"
  },
  {
    icon: CheckCircle,
    title: "Compliance Audit",
    shortDesc: "Regulatory compliance and certification support",
    fullDesc: "Comprehensive compliance assessments to ensure your organization meets regulatory requirements including ISO 27001, PCI DSS, and Indonesian regulations.",
    features: [
      "ISO 27001 Assessment",
      "PCI DSS Compliance",
      "Risk Management Review",
      "Control Testing",
      "Gap Analysis",
      "Certification Support"
    ],
    benefits: [
      "Meet regulatory requirements",
      "Avoid penalties",
      "Build customer trust",
      "Improve security posture"
    ],
    process: [
      { step: "1", title: "Review", desc: "Current compliance" },
      { step: "2", title: "Assess", desc: "Gap identification" },
      { step: "3", title: "Remediate", desc: "Fix gaps" },
      { step: "4", title: "Validate", desc: "Certification prep" }
    ],
    iconColor: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30"
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    shortDesc: "Build security awareness and skills",
    fullDesc: "Customized security training programs for all levels. From executive awareness to hands-on technical training, we help build a security-conscious culture.",
    features: [
      "Executive Briefings",
      "Developer Secure Coding",
      "Security Awareness",
      "Red Team Exercises",
      "Capture The Flag Events",
      "Custom Workshops"
    ],
    benefits: [
      "Reduce human error",
      "Build security culture",
      "Empower employees",
      "Improve response time"
    ],
    process: [
      { step: "1", title: "Assess", desc: "Training needs" },
      { step: "2", title: "Design", desc: "Custom curriculum" },
      { step: "3", title: "Deliver", desc: "Interactive training" },
      { step: "4", title: "Measure", desc: "Knowledge retention" }
    ],
    iconColor: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30"
  }
];

const stats = [
  { icon: Target, value: "500+", label: "Security Assessments" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: Users, value: "50+", label: "Expert Consultants" },
  { icon: Shield, value: "99.9%", label: "Client Satisfaction" }
];

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-background" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-indigo/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Our Services
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Enterprise Security <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              Comprehensive cybersecurity services tailored to protect your organization 
              from evolving threats and ensure regulatory compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-accent-indigo" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-sm text-text-tertiary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="group relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.3)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Service Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
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
                          <CheckCircle className="w-4 h-4 text-accent-indigo flex-shrink-0" />
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
                          <Zap className="w-4 h-4 text-accent-purple flex-shrink-0" />
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
                        <div key={sIndex} className="text-center p-3 rounded-lg bg-bg-tertiary/50 border border-border-subtle">
                          <div className="w-8 h-8 rounded-full bg-accent-indigo/20 text-accent-indigo font-bold flex items-center justify-center mx-auto mb-2 text-sm">
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
                    className="relative group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple opacity-90 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="relative text-white font-semibold flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-bg-secondary/50 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Industries We <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We provide specialized security solutions across various industries, 
              understanding unique regulatory requirements and threat landscapes.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Server, name: "Technology", desc: "SaaS, Cloud, Data Centers" },
              { icon: Lock, name: "Financial", desc: "Banking, Insurance, Fintech" },
              { icon: Globe, name: "Government", desc: "Public Sector, Defense" },
              { icon: Users, name: "Healthcare", desc: "Hospitals, Pharma" },
            ].map((industry, index) => (
              <motion.div 
                key={index}
                className="group relative p-6 rounded-xl bg-bg-elevated/50 border border-border-subtle text-center backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.3)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <industry.icon className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                  <p className="text-sm text-text-tertiary">{industry.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Secure Your <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Organization</span>?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Contact us today for a free consultation and discover how we can help 
              protect your business from cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="relative group inline-flex items-center px-8 py-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative px-8 py-4 bg-accent-indigo text-white font-semibold rounded-xl hover:bg-accent-indigo/90 transition-colors">
                  Schedule Consultation
                </div>
              </Link>
              <Link 
                href="/about"
                className="px-8 py-4 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-indigo hover:text-accent-indigo transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
