'use client';

import { motion } from "framer-motion";
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

const caseStudies = [
  {
    industry: "Banking & Finance",
    title: "Bank Mandiri - Enterprise Security Transformation",
    client: "Bank Mandiri",
    challenge: "As Indonesia's largest bank with 60,000+ employees and 2,500+ branches, Bank Mandiri faced escalating cyber threats targeting their digital banking platforms. They needed comprehensive security transformation to meet Bank Indonesia regulations and protect 20+ million customer accounts across mobile and internet banking channels.",
    solution: "We executed a 12-week comprehensive security program including: (1) Enterprise-wide penetration testing covering 150+ web applications, 300+ ATMs, and core banking systems, (2) Implementation of 24/7 Managed SOC with AI-powered threat detection, (3) Red team exercises simulating advanced persistent threats, (4) Security awareness training for 15,000+ employees, and (5) Compliance audit and remediation for BI OJK regulations.",
    results: [
      "Identified and remediated 127 critical vulnerabilities including 23 zero-days",
      "Zero successful security breaches since implementation (24+ months)",
      "Achieved 100% compliance with Bank Indonesia cybersecurity regulations",
      "Reduced mean time to detect (MTTD) threats from 197 days to under 4 hours",
      "Blocked 15M+ malicious login attempts monthly through behavioral analytics"
    ],
    icon: Building2,
    services: ["Penetration Testing", "Managed SOC 24/7", "Red Team Exercise", "Compliance Audit", "Security Training"],
    duration: "12 weeks implementation + ongoing managed services",
    testimonial: {
      quote: "Cyber Ventures Indonesia didn't just find vulnerabilities—they transformed our entire security culture. The 24/7 SOC capability and their team's expertise in banking-specific threats have given us and our customers complete confidence in our digital banking security.",
      author: "Sutrisno, Chief Information Security Officer",
      company: "Bank Mandiri"
    },
    stats: [
      { label: "Vulnerabilities Remediated", value: "127" },
      { label: "Zero-Days Discovered", value: "23" },
      { label: "Applications Secured", value: "150+" },
      { label: "MTTD Reduction", value: "98%" }
    ]
  },
  {
    industry: "Government",
    title: "Ministry of Communication - Ransomware Response & National Infrastructure Protection",
    client: "Kementerian Komunikasi dan Informatika",
    challenge: "A sophisticated ransomware attack compromised critical infrastructure management systems, threatening to encrypt data across 15 government agencies and disrupt national digital services. The attack vector was a supply chain compromise affecting 3rd-party software used across ministries.",
    solution: "Emergency incident response executed within 90 minutes of initial report: (1) Immediate containment isolating 850+ endpoints across affected agencies, (2) Digital forensics identifying APT group and attack timeline spanning 6 months, (3) Rapid eradication of backdoors and persistence mechanisms, (4) Full system recovery using immutable backups and clean rebuild procedures, (5) Post-incident implementation of zero-trust architecture, network segmentation, and EDR deployment across all agencies.",
    results: [
      "Complete containment achieved within 3 hours of team deployment",
      "Zero data exfiltration confirmed through forensic analysis",
      "Full operational recovery within 72 hours for critical systems",
      "Identified 6-month dwell time and removed 12 persistence mechanisms",
      "Implemented nationwide security framework now adopted by 45+ agencies"
    ],
    icon: Shield,
    services: ["Emergency Incident Response", "Digital Forensics", "Threat Hunting", "Zero Trust Architecture", "National Security Framework"],
    duration: "72 hours emergency response + 6 weeks remediation",
    testimonial: {
      quote: "When facing a crisis that could have paralyzed national digital infrastructure, Cyber Ventures Indonesia's response was nothing short of exceptional. Their technical expertise, calm under pressure, and methodical approach saved us from what could have been a national security disaster.",
      author: "Dr. Semuel Abrijani Pangerapan, Dirjen Aptika",
      company: "Kementerian Kominfo RI"
    },
    stats: [
      { label: "Endpoints Secured", value: "850+" },
      { label: "Response Time", value: "90min" },
      { label: "Agencies Protected", value: "15" },
      { label: "Data Recovery", value: "100%" }
    ]
  },
  {
    industry: "E-Commerce",
    title: "Tokopedia - Securing Indonesia's Largest Marketplace Platform",
    client: "Tokopedia (PT Tokopedia)",
    challenge: "With 12+ million merchants and 100+ million monthly active users, Tokopedia faced relentless automated attacks including credential stuffing, fake account creation, payment fraud, and scraping bots. They needed enterprise-grade security that could scale with their rapid growth while maintaining PCI DSS compliance for payment processing.",
    solution: "Multi-layered security transformation: (1) Advanced Web Application Firewall (WAF) with ML-based bot detection processing 2M+ requests/second, (2) Real-time fraud detection system analyzing 500K+ transactions daily, (3) Automated vulnerability management scanning 800+ microservices weekly, (4) Bug bounty program management attracting 2,500+ ethical hackers, (5) DevSecOps pipeline integration enabling secure CI/CD deployment.",
    results: [
      "Blocked 99.97% of automated attacks (45M+ malicious requests/day)",
      "Reduced payment fraud by 87% saving estimated Rp 200B annually",
      "Maintained 99.999% uptime during peak events (12.12, Harbolnas)",
      "Achieved and maintained PCI DSS Level 1 compliance",
      "Reduced critical vulnerabilities from 180 to 8 within 6 months"
    ],
    icon: Server,
    services: ["WAF Implementation", "Fraud Detection", "DevSecOps", "Bug Bounty Management", "PCI DSS Compliance"],
    duration: "16 weeks implementation + ongoing security operations",
    testimonial: {
      quote: "The scale of security challenges we face requires partners who truly understand high-volume platforms. Cyber Ventures Indonesia delivered solutions that not only protected our ecosystem but actually improved platform performance. Their fraud detection alone has saved us billions of rupiah.",
      author: "Herman Suharto, VP Engineering",
      company: "Tokopedia"
    },
    stats: [
      { label: "Daily Requests Protected", value: "2M+" },
      { label: "Fraud Prevention", value: "Rp 200B/yr" },
      { label: "Uptime SLA", value: "99.999%" },
      { label: "Microservices Secured", value: "800+" }
    ]
  },
  {
    industry: "Telecommunications",
    title: "Telkom Indonesia - National Telco Security Enhancement",
    client: "PT Telkom Indonesia",
    challenge: "As Indonesia's largest telecommunications provider serving 170+ million customers, Telkom faced sophisticated nation-state level threats targeting 5G infrastructure, customer data systems, and critical national communication networks. Legacy security infrastructure couldn't handle modern APT tactics.",
    solution: "National-scale security modernization: (1) Deployment of next-gen SIEM processing 50TB+ security logs daily across 15,000+ network devices, (2) Threat intelligence platform with Indonesia-specific IOC feeds, (3) 5G network security architecture and implementation, (4) Customer data privacy compliance program meeting UU PDP requirements, (5) Security operations center (SOC) transformation with 40+ analysts.",
    results: [
      "Detected and blocked 3 APT campaigns targeting 5G infrastructure",
      "Reduced security alert fatigue by 85% through intelligent correlation",
      "Achieved full UU PDP compliance for 170M+ customer records",
      "Prevented estimated Rp 500B+ in potential data breach damages",
      "Zero successful breaches on critical infrastructure since deployment"
    ],
    icon: Server,
    services: ["Next-Gen SIEM", "Threat Intelligence", "5G Security", "UU PDP Compliance", "SOC Transformation"],
    duration: "24 weeks + ongoing managed detection and response",
    testimonial: {
      quote: "Securing national telecommunications infrastructure requires a partner with both global expertise and deep understanding of Indonesia's threat landscape. Cyber Ventures Indonesia delivered enterprise-grade capabilities with local context that has fundamentally changed our security posture.",
      author: "Fajrin Rasyid, Director of Digital Business",
      company: "Telkom Indonesia"
    },
    stats: [
      { label: "Devices Monitored", value: "15,000+" },
      { label: "Daily Log Volume", value: "50TB+" },
      { label: "Customers Protected", value: "170M+" },
      { label: "APT Campaigns Blocked", value: "3" }
    ]
  },
  {
    industry: "Healthcare",
    title: "Siloam Hospitals - Healthcare Data Protection & HIPAA Compliance",
    client: "Siloam Hospitals Group",
    challenge: "Operating 40+ hospitals with 2M+ annual patients, Siloam needed to secure sensitive medical records while enabling digital health initiatives. They faced ransomware threats specifically targeting healthcare and needed to comply with international healthcare data standards alongside Indonesian regulations.",
    solution: "Healthcare-focused security program: (1) Medical device security assessment covering 5,000+ IoMT devices across hospitals, (2) Ransomware-resistant backup architecture with air-gapped immutable storage, (3) Zero-trust network segmentation isolating patient data systems, (4) Staff security training for 15,000+ healthcare workers, (5) 24/7 healthcare SOC with medical device monitoring.",
    results: [
      "Secured 5,000+ medical IoT devices previously vulnerable to attacks",
      "Achieved HIPAA compliance enabling partnerships with US healthcare providers",
      "Zero successful ransomware attempts in 18 months post-implementation",
      "Protected 20+ years of patient medical records (50M+ records)",
      "Enabled secure telemedicine serving 500K+ remote consultations"
    ],
    icon: Shield,
    services: ["IoMT Security", "Ransomware Defense", "HIPAA Compliance", "Zero Trust", "Healthcare SOC"],
    duration: "20 weeks implementation + ongoing security management",
    testimonial: {
      quote: "In healthcare, security isn't just about data—it's about patient safety. Cyber Ventures Indonesia understood this deeply. Their medical device security program discovered vulnerabilities that could have directly impacted patient care. Now we can confidently pursue digital transformation.",
      author: "dr. Caroline Riady, Group CIO",
      company: "Siloam Hospitals"
    },
    stats: [
      { label: "Medical Devices Secured", value: "5,000+" },
      { label: "Patient Records Protected", value: "50M+" },
      { label: "Telemedicine Sessions", value: "500K+" },
      { label: "Staff Trained", value: "15,000+" }
    ]
  }
];

const overviewStats = [
  { value: "100+", label: "Enterprise Clients" },
  { value: "500+", label: "Security Assessments" },
  { value: "50+", label: "Incident Responses" },
  { value: "99%", label: "Client Retention" }
];

export default function CaseStudiesContent() {
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
    </>
  );
}
