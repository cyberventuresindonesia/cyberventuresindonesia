"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  User,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@cyberventuresindonesia.com",
    link: "mailto:info@cyberventuresindonesia.com",
    description: "For general inquiries and proposals"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+62 812-3456-7890",
    link: "tel:+6281234567890",
    description: "Mon-Fri, 9am-6pm WIB"
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Jakarta, Indonesia",
    link: "#",
    description: "Jl. Cyber Security No. 123, Jakarta 12345"
  },
  {
    icon: Clock,
    title: "Emergency",
    value: "24/7 Hotline",
    link: "tel:+6281234567899",
    description: "For security incidents only"
  }
];

const services = [
  "Penetration Testing",
  "Vulnerability Assessment",
  "Security Consulting",
  "Incident Response",
  "Compliance Audit",
  "Security Training",
  "Managed SOC",
  "Other"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For now, just show success (will integrate with Hostinger API later)
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: ""
    });
  };

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Let's Start a <span className="text-gradient">Conversation</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                Ready to secure your organization? Get in touch with our team for a 
                free consultation and security assessment.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="group p-6 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                    <info.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                  <p className="text-accent-cyan font-medium mb-1">{info.value}</p>
                  <p className="text-sm text-text-tertiary">{info.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-text-secondary mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-success/10 border border-success/30 text-center">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Thank you for reaching out. Our team will review your inquiry and 
                      get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-accent-cyan text-background font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 rounded-lg bg-danger/10 border border-danger/30 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                        <p className="text-sm text-danger">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors"
                            placeholder="PT Company Indonesia"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors"
                            placeholder="+62 812-3456-7890"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground focus:border-accent-cyan focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a service...</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your security needs..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-cyan"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Info Side */}
              <div className="lg:pl-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Choose Us?
                </h2>
                <p className="text-text-secondary mb-8">
                  Partner with Indonesia's leading cybersecurity firm for comprehensive 
                  protection and peace of mind.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Local Expertise",
                      desc: "Deep understanding of Indonesian regulatory landscape and threat environment"
                    },
                    {
                      title: "Certified Team",
                      desc: "CISSP, OSCP, CEH certified professionals with 10+ years experience"
                    },
                    {
                      title: "Rapid Response",
                      desc: "24/7 incident response with guaranteed SLAs for critical situations"
                    },
                    {
                      title: "Proven Track Record",
                      desc: "500+ successful security assessments for enterprise clients"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-text-secondary text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Emergency Banner */}
                <div className="mt-10 p-6 rounded-2xl bg-danger/10 border border-danger/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-danger/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-danger" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Security Emergency?</h3>
                      <p className="text-text-secondary text-sm mb-3">
                        If you're experiencing a security incident, call our 24/7 hotline immediately.
                      </p>
                      <a 
                        href="tel:+6281234567899" 
                        className="inline-flex items-center gap-2 text-danger font-semibold hover:underline"
                      >
                        <Phone className="w-4 h-4" />
                        +62 812-3456-7899
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary">
                Common questions about our services and process
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How quickly can you respond to a security incident?",
                  a: "Our incident response team is available 24/7. For critical incidents, we guarantee initial response within 1 hour and on-site presence within 4 hours for Jakarta area clients."
                },
                {
                  q: "What industries do you specialize in?",
                  a: "We have deep expertise across financial services, government, healthcare, technology, and e-commerce sectors. Our team understands the unique compliance and security requirements of each industry."
                },
                {
                  q: "How long does a typical penetration test take?",
                  a: "The duration depends on scope and complexity. A standard web application test takes 5-10 days, while comprehensive network penetration tests may take 2-4 weeks including reporting."
                },
                {
                  q: "Do you provide ongoing security monitoring?",
                  a: "Yes, we offer Managed Security Operations Center (SOC) services with 24/7 monitoring, threat detection, and incident response for organizations that need continuous protection."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-bg-elevated border border-border-subtle"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
