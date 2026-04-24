"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Target, Users, AlertTriangle, Terminal } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Trust logos (placeholder - replace with actual partner logos)
const trustLogos = [
  { name: "Bank Indonesia", initials: "BI" },
  { name: "Telkom Indonesia", initials: "TLK" },
  { name: "Pertamina", initials: "PTR" },
  { name: "BNI", initials: "BNI" },
  { name: "Mandiri", initials: "MDR" },
  { name: "BCA", initials: "BCA" },
];

// Cyber metrics data
const cyberMetrics = [
  { 
    value: 500, 
    suffix: "+", 
    label: "Skills Verified",
    icon: Zap,
    color: "text-accent-indigo"
  },
  { 
    value: 98, 
    suffix: "%", 
    label: "Threat Detection Rate",
    icon: Target,
    color: "text-accent-purple"
  },
  { 
    value: 50, 
    suffix: "+", 
    label: "Security Teams Ready",
    icon: Users,
    color: "text-accent-cyan"
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Effects - Immersive Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-bg-secondary to-bg-tertiary" />
      
      {/* Grid Pattern - Indigo/Purple */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow Effects - Immersive Style */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent-indigo/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.2, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-indigo/10 to-accent-purple/10 rounded-full blur-[200px]"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content - Two Column Layout */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Metrics */}
          <motion.div 
            className="order-2 lg:order-1"
            variants={fadeIn}
          >
            {/* Live Indicator */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 mb-6"
              variants={fadeInUp}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-indigo opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-indigo"></span>
              </span>
              <span className="text-xs font-mono text-accent-indigo">
                SYSTEM OPERATIONAL
              </span>
            </motion.div>

            {/* Cyber Metrics Cards */}
            <div className="space-y-4">
              {cyberMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="gradient-border p-4 rounded-xl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center ${metric.color}`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-3xl font-bold font-mono ${metric.color}`}>
                        <AnimatedCounter 
                          end={metric.value} 
                          duration={2} 
                          suffix={metric.suffix}
                        />
                      </div>
                      <div className="text-sm text-text-secondary">{metric.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Bar */}
            <motion.div 
              className="mt-8"
              variants={fadeInUp}
            >
              <p className="text-xs text-text-tertiary mb-3 tracking-wider uppercase">Trusted by Industry Leaders</p>
              <div className="relative overflow-hidden">
                <div className="flex animate-infinite-scroll">
                  {[...trustLogos, ...trustLogos].map((logo, i) => (
                    <div 
                      key={i} 
                      className="flex-shrink-0 mx-4 px-4 py-2 bg-bg-secondary rounded-lg border border-border-subtle"
                    >
                      <span className="text-sm font-semibold text-text-tertiary">{logo.initials}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Main Content */}
          <motion.div 
            className="order-1 lg:order-2 text-center lg:text-left"
            variants={fadeInUp}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Shield className="w-4 h-4 text-accent-indigo" />
              <span className="text-sm font-medium text-accent-indigo">
                Building Indonesia's Elite Cyber Team
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-foreground">Secure Your</span>
              <br />
              <span className="text-gradient">Digital Future</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-lg text-text-secondary mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              PT Cyber Ventures Indonesia delivers enterprise-grade cybersecurity services 
              including penetration testing, threat intelligence, and elite security talent development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Primary CTA with Glow */}
              <Link
                href="/join-us"
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300" />
                <div className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-bg-secondary text-foreground rounded-xl border border-border-subtle group-hover:border-accent-indigo transition-all duration-300">
                  <Terminal className="w-5 h-5 text-accent-indigo" />
                  <span className="font-mono tracking-wide">Prove Your Skills</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-text-secondary border-2 border-border-default rounded-xl hover:border-accent-indigo hover:text-accent-indigo transition-all duration-300"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Microcopy - Elite Requirement Warning */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-xs text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AlertTriangle className="w-3 h-3 text-warning" />
              <span className="font-mono">
                Minimum requirement: 10+ verified real-world security assessments
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs tracking-wider uppercase font-mono">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-border-default flex justify-center pt-2">
          <motion.div 
            className="w-1 h-2 bg-accent-indigo rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
