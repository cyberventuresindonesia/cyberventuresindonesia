"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Shield,
  Terminal,
  ArrowRight,
  ChevronRight,
  Globe,
  MessageCircle,
  Code
} from "lucide-react";

const footerLinks = {
  products: [
    { label: "Penetration Testing", href: "/services#pentest" },
    { label: "Vulnerability Assessment", href: "/services#vuln" },
    { label: "Security Consulting", href: "/services#consulting" },
    { label: "Incident Response", href: "/services#incident" },
    { label: "Compliance Audit", href: "/services#compliance" },
    { label: "Security Training", href: "/services#training" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Blog & Reports", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Threat Intelligence", href: "#" },
    { label: "Security Blog", href: "/blog" },
    { label: "API Reference", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Code, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary via-bg-secondary to-bg-secondary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Section */}
        <motion.div 
          className="mb-16 pb-16 border-b border-border-subtle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent-indigo" />
                Stay Ahead of Threats
              </h3>
              <p className="text-text-secondary">
                Get weekly threat intelligence reports and security insights delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <div className="relative flex-1 lg:w-80">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="relative w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-indigo transition-colors"
                />
              </div>
              <button className="relative group px-6 py-3 bg-accent-indigo text-white font-semibold rounded-lg hover:bg-accent-indigo/90 transition-colors flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Cyber Ventures Indonesia"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">
                  CYBER VENTURES
                </span>
                <span className="text-xs text-accent-indigo font-medium tracking-wider">
                  INDONESIA
                </span>
              </div>
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm text-sm leading-relaxed">
              Building Indonesia&apos;s elite cybersecurity workforce through rigorous training 
              and real-world assessment programs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a 
                href="mailto:team@cyberventures.id" 
                className="flex items-center gap-3 text-text-secondary hover:text-accent-indigo transition-colors group"
              >
                <Mail className="w-4 h-4 text-accent-indigo" />
                team@cyberventures.id
              </a>
              <a 
                href="tel:+6281234567890" 
                className="flex items-center gap-3 text-text-secondary hover:text-accent-indigo transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-indigo" />
                +62 812-3456-7890
              </a>
              <div className="flex items-start gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-indigo flex-shrink-0 mt-0.5" />
                <span>Jl. Cyber Security No. 123<br />Jakarta Selatan, 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/50 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent-purple" />
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-text-secondary hover:text-accent-indigo transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-text-secondary hover:text-accent-indigo transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-text-secondary hover:text-accent-indigo transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-text-secondary hover:text-accent-indigo transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} PT Cyber Ventures Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-text-muted flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-indigo" />
              ISO 27001 Certified
            </span>
            <span className="text-sm text-text-muted">
              Enterprise Security Solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
