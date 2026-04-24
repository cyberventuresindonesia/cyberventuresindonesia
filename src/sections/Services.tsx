"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Search, 
  FileSearch, 
  Siren, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  UserCheck,
  Terminal,
  Award
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    description: "Comprehensive security assessments simulating real-world attacks to identify vulnerabilities before malicious actors do.",
    features: ["Network & Web App Testing", "Social Engineering", "Detailed Reports"],
    color: "indigo",
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description: "Systematic scanning and analysis of your infrastructure to discover security weaknesses and misconfigurations.",
    features: ["Automated Scanning", "Risk Prioritization", "Remediation Guidance"],
    color: "purple",
  },
  {
    icon: FileSearch,
    title: "Security Consulting",
    description: "Strategic cybersecurity guidance to help your organization build and maintain robust security postures.",
    features: ["Security Architecture", "Policy Development", "Risk Assessment"],
    color: "cyan",
  },
  {
    icon: Siren,
    title: "Incident Response",
    description: "24/7 emergency response services to contain breaches, minimize damage, and restore operations quickly.",
    features: ["Rapid Response", "Forensic Analysis", "Recovery Support"],
    color: "red",
  },
  {
    icon: Award,
    title: "Compliance Audit",
    description: "Expert assessment of your compliance with ISO 27001, PCI DSS, and other regulatory frameworks.",
    features: ["ISO 27001", "PCI DSS", "Government Standards"],
    color: "green",
  },
  {
    icon: Terminal,
    title: "Security Training",
    description: "Customized security awareness programs to educate your workforce and build a security-conscious culture.",
    features: ["Phishing Simulation", "Awareness Training", "Certification Prep"],
    color: "yellow",
  },
];

const colorClasses: Record<string, { icon: string; border: string; glow: string }> = {
  indigo: { icon: "text-accent-indigo", border: "group-hover:border-accent-indigo/50", glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]" },
  purple: { icon: "text-accent-purple", border: "group-hover:border-accent-purple/50", glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]" },
  cyan: { icon: "text-accent-cyan", border: "group-hover:border-accent-cyan/50", glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" },
  red: { icon: "text-danger", border: "group-hover:border-danger/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" },
  green: { icon: "text-success", border: "group-hover:border-success/50", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]" },
  yellow: { icon: "text-warning", border: "group-hover:border-warning/50", glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-secondary to-bg-tertiary" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Our Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Enterprise Security <span className="text-gradient">Solutions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Comprehensive cybersecurity services tailored to protect your organization 
            from evolving threats and ensure regulatory compliance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle ${colors.border} ${colors.glow} transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${service.color === 'indigo' ? 'accent-indigo' : service.color === 'purple' ? 'accent-purple' : 'accent-cyan'}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-bg-tertiary border border-border-subtle flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  
                  {/* Title with arrow on hover */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <ArrowRight className={`w-5 h-5 ${colors.icon} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                  </div>
                  
                  {/* Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-text-tertiary">
                        <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Service - Large Card */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-elevated border border-border-subtle overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-indigo/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-xs font-medium mb-4">
                  <Lock className="w-3 h-3" />
                  Featured Capability
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Cyber Resilience Platform
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Our flagship integrated security platform combines continuous monitoring, 
                  threat intelligence, and automated response to deliver unmatched 
                  protection for your digital assets.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <UserCheck className="w-4 h-4 text-accent-indigo" />
                    <span>24/7 Expert Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Zap className="w-4 h-4 text-accent-purple" />
                    <span>Real-time Detection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Shield className="w-4 h-4 text-accent-cyan" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-semibold rounded-lg hover:bg-accent-indigo/90 transition-colors group"
                >
                  Explore Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle text-center">
                  <div className="text-3xl font-bold text-accent-indigo mb-1">500+</div>
                  <div className="text-sm text-text-secondary">Threats Blocked Daily</div>
                </div>
                <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle text-center">
                  <div className="text-3xl font-bold text-accent-purple mb-1">&lt;1s</div>
                  <div className="text-sm text-text-secondary">Response Time</div>
                </div>
                <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle text-center">
                  <div className="text-3xl font-bold text-accent-cyan mb-1">50+</div>
                  <div className="text-sm text-text-secondary">Enterprise Clients</div>
                </div>
                <div className="p-6 rounded-2xl bg-bg-elevated/50 border border-border-subtle text-center">
                  <div className="text-3xl font-bold text-success mb-1">98%</div>
                  <div className="text-sm text-text-secondary">Threat Detection Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
