"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Terminal, Lock, AlertTriangle } from "lucide-react";

const benefits = [
  { icon: Shield, text: "4-Gate Assessment Process" },
  { icon: Terminal, text: "Hands-on Technical Challenges" },
  { icon: Lock, text: "Industry-Recognized Certifications" },
];

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary" />
      
      {/* Animated Glow Effects */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-indigo/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main CTA Card */}
          <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-bg-elevated/80 via-bg-secondary/80 to-bg-tertiary/80 border border-border-subtle backdrop-blur-sm overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-indigo/20 via-accent-purple/20 to-accent-cyan/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent-indigo/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent-purple/30 rounded-br-3xl" />

            <div className="relative z-10 text-center">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Terminal className="w-4 h-4 text-accent-indigo" />
                <span className="text-sm font-medium text-accent-indigo font-mono">
                  Now Enrolling: Cohort Q2-2026
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Join{" "}
                <span className="text-gradient">Indonesia&apos;s Elite</span>
                <br />
                Cyber Team?
              </motion.h2>

              {/* Subheadline */}
              <motion.p 
                className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Start your journey with our rigorous 4-gate assessment process. 
                Only the top 5% of candidates advance to become certified 
                Cyber Ventures security professionals.
              </motion.p>

              {/* Benefits */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-tertiary border border-border-subtle"
                  >
                    <benefit.icon className="w-4 h-4 text-accent-indigo" />
                    <span className="text-sm text-text-secondary">{benefit.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {/* Primary CTA */}
                <Link
                  href="/join-us"
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse" />
                  <div className="relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-bg-secondary text-foreground rounded-xl border border-border-subtle group-hover:border-accent-indigo transition-all duration-300">
                    <Terminal className="w-5 h-5 text-accent-indigo" />
                    <span className="font-mono tracking-wide">Enter Sentinel Gate</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium text-text-secondary border-2 border-border-default rounded-xl hover:border-accent-indigo hover:text-accent-indigo transition-all duration-300"
                >
                  View All Positions
                </Link>
              </motion.div>

              {/* Elite Requirement Warning */}
              <motion.div
                className="mt-8 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <AlertTriangle className="w-4 h-4 text-warning" />
                <p className="text-sm text-text-muted font-mono">
                  Strict eligibility: CVE disclosure record OR OSCP/OSCE certification required
                </p>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                className="mt-12 pt-8 border-t border-border-subtle grid grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-accent-indigo">500+</div>
                  <div className="text-xs text-text-muted mt-1">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-accent-purple">5%</div>
                  <div className="text-xs text-text-muted mt-1">Acceptance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-accent-cyan">48h</div>
                  <div className="text-xs text-text-muted mt-1">Avg. Response</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
