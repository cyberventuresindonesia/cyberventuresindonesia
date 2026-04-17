"use client";

import Link from "next/link";
import { ArrowRight, Shield, Lock, Eye } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-background to-background" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cobalt/20 rounded-full blur-[128px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 mb-8">
          <Shield className="w-4 h-4 text-accent-cyan" />
          <span className="text-sm font-medium text-accent-cyan">
            ISO 27001 Certified
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-foreground">Advanced</span>{" "}
          <span className="text-gradient">Cybersecurity</span>
          <br />
          <span className="text-foreground">Solutions</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed">
          PT Cyber Ventures Indonesia delivers enterprise-grade security services 
          including penetration testing, vulnerability assessment, and managed SOC 
          operations for organizations across Indonesia.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-accent-cyan text-background rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 glow-cyan"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-accent-cyan border-2 border-accent-cyan rounded-xl hover:bg-accent-cyan/10 transition-all duration-300"
          >
            Explore Services
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent-cyan" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">10+</div>
            <div className="text-sm text-text-tertiary">Years Experience</div>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-accent-cyan" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">500+</div>
            <div className="text-sm text-text-tertiary">Threats Blocked</div>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-accent-cyan" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">24/7</div>
            <div className="text-sm text-text-tertiary">Security Monitoring</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-border-default flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent-cyan rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
