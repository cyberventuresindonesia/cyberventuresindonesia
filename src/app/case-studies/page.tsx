'use client';

import type { Metadata } from "next";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  CheckCircle, 
  TrendingUp,
  Building2,
  Lock,
  Server,
  Clock,
  ArrowRight,
  Target,
  AlertTriangle,
  FileCheck,
  Zap,
  Sparkles,
  Award
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore how Cyber Ventures Indonesia has helped organizations strengthen their security posture and respond to cyber threats.",
};

const caseStudies = [
  {
    industry: "Banking & Finance",
    title: "Major Indonesian Bank Strengthens Security Posture",
    challenge: "A major national bank faced increasing cyber threats and regulatory pressure to enhance their security infrastructure. They needed comprehensive penetration testing and ongoing security monitoring.",
    solution: "We conducted a thorough 4-week penetration test covering network infrastructure, web applications, and mobile banking platforms. Implemented managed SOC services for 24/7 monitoring.",
    results: [
      "Identified and remediated 45 critical vulnerabilities",
      "Zero successful breaches since implementation",
      "Achieved full compliance with BI regulations",
      "Reduced incident response time by 70%"
    ],
    icon: Building2,
    services: ["Penetration Testing", "Managed SOC", "Compliance Audit"],
    duration: "4 weeks initial, ongoing monitoring",
    testimonial: {
      quote: "Cyber Ventures Indonesia transformed our security operations. Their thorough approach and ongoing support give us confidence in our ability to protect customer data.",
      author: "Chief Information Security Officer",
      company: "Major Indonesian Bank"
    },
    stats: [
      { label: "Vulnerabilities Found", value: "45" },
      { label: "Critical Issues", value: "12" },
      { label: "Remediation Rate", value: "100%" },
      { label: "Compliance Score", value: "98%" }
    ]
  },
  {
    industry: "Government",
    title: "Government Agency Incident Response & Recovery",
    challenge: "A government agency experienced a sophisticated ransomware attack that encrypted critical systems and threatened to expose sensitive citizen data.",
    solution: "Our incident response team was deployed within 2 hours. We contained the breach, eradicated the threat, restored systems from backups, and implemented enhanced security controls.",
    results: [
      "Contained breach within 4 hours of engagement",
      "Zero data exfiltration confirmed",
      "Full system recovery in 48 hours",
      "Implemented zero-trust architecture"
    ],
    icon: Shield,
    services: ["Incident Response", "Digital Forensics", "Security Architecture"],
    duration: "72 hours emergency response",
    testimonial: {
      quote: "Their rapid response saved us from a potential disaster. The team's expertise and professionalism during the crisis was exceptional.",
      author: "Head of IT",
      company: "Government Agency"
    },
    stats: [
      { label: "Response Time", value: "2hrs" },
      { label: "Containment", value: "4hrs" },
      { label: "Recovery", value: "48hrs" },
      { label: "Data Lost", value: "0%" }
    ]
  },
  {
    industry: "E-Commerce",
    title: "E-Commerce Platform Security Overhaul",
    challenge: "A rapidly growing e-commerce platform with 2M+ users needed to secure their infrastructure against increasing attacks while maintaining PCI DSS compliance.",
    solution: "Comprehensive security assessment followed by implementation of WAF, enhanced authentication, encryption protocols, and continuous vulnerability management.",
    results: [
      "Blocked 99.9% of automated attacks",
      "Maintained 100% PCI DSS compliance",
      "Reduced fraud attempts by 85%",
      "Zero data breaches over 18 months"
    ],
    icon: Server,
    services: ["Vulnerability Assessment", "PCI DSS Compliance", "Security Consulting"],
    duration: "8 weeks implementation",
    testimonial: {
      quote: "Their comprehensive approach addressed vulnerabilities we didn't even know existed. Our platform is now more secure than ever.",
      author: "CTO",
      company: "Leading E-Commerce Platform"
    },
    stats: [
      { label: "Attacks Blocked", value: "1.2M" },
      { label: "Fraud Reduction", value: "85%" },
      { label: "Uptime", value: "99.99%" },
      { label: "User Trust", value: "+40%" }
    ]
  }
];

const overviewStats = [
  { value: "100+", label: "Enterprise Clients" },
  { value: "500+", label: "Security Assessments" },
  { value: "50+", label: "Incident Responses" },
  { value: "99%", label: "Client Retention" }
];

export default function CaseStudiesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
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
                Case Studies
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Security Success <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Stories</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                Discover how we&apos;ve helped organizations across Indonesia strengthen 
                their security posture and respond to cyber threats.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {overviewStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-cyan mb-1">{stat.value}</div>
                  <div className="text-sm text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <motion.article 
                  key={index}
                  className="group relative p-8 md:p-12 rounded-3xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                      <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/10 text-accent-indigo text-sm font-medium mb-3">
                          <Award className="w-3 h-3" />
                          {study.industry}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {study.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-tertiary bg-bg-tertiary/50 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        {study.duration}
                      </div>
                    </div>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.services.map((service, sIndex) => (
                        <span 
                          key={sIndex}
                          className="px-4 py-2 rounded-lg bg-bg-tertiary/50 text-text-secondary text-sm font-medium border border-border-subtle"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left Column - Challenge & Solution */}
                      <div className="space-y-8">
                        {/* Challenge */}
                        <div className="relative p-6 rounded-xl bg-danger/5 border border-danger/20">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-danger/10 border border-danger/30 flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-danger" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">The Challenge</h3>
                          </div>
                          <p className="text-text-secondary leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="relative p-6 rounded-xl bg-accent-indigo/5 border border-accent-indigo/20">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-accent-indigo" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Our Solution</h3>
                          </div>
                          <p className="text-text-secondary leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        {/* Testimonial */}
                        <div className="p-6 rounded-xl bg-bg-tertiary/30 border border-border-subtle">
                          <blockquote className="text-text-secondary italic mb-4">
                            &ldquo;{study.testimonial.quote}&rdquo;
                          </blockquote>
                          <div className="text-sm">
                            <div className="font-semibold text-foreground">{study.testimonial.author}</div>
                            <div className="text-text-tertiary">{study.testimonial.company}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Results & Stats */}
                      <div className="space-y-8">
                        {/* Results */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-success" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Key Results</h3>
                          </div>
                          <ul className="space-y-3">
                            {study.results.map((result, rIndex) => (
                              <li key={rIndex} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                </div>
                                <span className="text-text-secondary">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Stats */}
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-4">Impact Metrics</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {study.stats.map((stat, stIndex) => (
                              <motion.div 
                                key={stIndex}
                                className="p-4 rounded-xl bg-bg-tertiary/50 border border-border-subtle text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: stIndex * 0.1 }}
                              >
                                <div className="text-2xl font-bold bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent mb-1">{stat.value}</div>
                                <div className="text-xs text-text-tertiary">{stat.label}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-bg-secondary/50 border-t border-border-subtle">
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
                Let&apos;s discuss how we can help strengthen your security posture 
                and protect your critical assets.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contact"
                  className="relative group inline-flex items-center px-8 py-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <div className="relative px-8 py-4 bg-accent-indigo text-white font-semibold rounded-xl hover:bg-accent-indigo/90 transition-colors">
                    Start Your Project
                  </div>
                </Link>
                <Link 
                  href="/services"
                  className="px-8 py-4 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-indigo hover:text-accent-indigo transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
