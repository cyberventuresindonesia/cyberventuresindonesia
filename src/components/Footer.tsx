"use client";

import Link from "next/link";
import { Shield, Mail, Phone, MapPin, ExternalLink, MessageCircle } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Penetration Testing", href: "/services#pentest" },
    { label: "Vulnerability Assessment", href: "/services#vuln" },
    { label: "Security Consulting", href: "/services#consulting" },
    { label: "Incident Response", href: "/services#incident" },
    { label: "Compliance Audit", href: "/services#compliance" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">
                  CYBER VENTURES
                </span>
                <span className="text-xs text-accent-cyan font-medium tracking-wider">
                  INDONESIA
                </span>
              </div>
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm">
              PT Cyber Ventures Indonesia delivers enterprise-grade cybersecurity 
              solutions to protect organizations from evolving digital threats.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:info@cyberventuresindonesia.com" 
                className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <Mail className="w-5 h-5 text-accent-cyan" />
                info@cyberventuresindonesia.com
              </a>
              <a 
                href="tel:+6281234567890" 
                className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <Phone className="w-5 h-5 text-accent-cyan" />
                +62 812-3456-7890
              </a>
              <div className="flex items-start gap-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span>Jl. Cyber Security No. 123<br />Jakarta, Indonesia 12345</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-cyan transition-colors"
                  >
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
                    className="text-text-secondary hover:text-accent-cyan transition-colors"
                  >
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
                    className="text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} PT Cyber Ventures Indonesia. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            ISO 27001 Certified • Enterprise Security Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
