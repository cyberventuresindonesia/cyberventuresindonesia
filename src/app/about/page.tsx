'use client';

import type { Metadata } from "next";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Award, 
  Users, 
  Globe, 
  Clock,
  CheckCircle,
  Target,
  Zap,
  Lock,
  FileCheck,
  TrendingUp,
  HeartHandshake,
  Terminal,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PT Cyber Ventures Indonesia - our mission, values, team of expert cybersecurity professionals, and commitment to protecting organizations across Indonesia.",
};

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize security in every decision, ensuring our clients receive the highest level of protection against evolving cyber threats."
  },
  {
    icon: Target,
    title: "Precision & Excellence",
    description: "We deliver accurate, thorough assessments with meticulous attention to detail, leaving no vulnerability unchecked."
  },
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    description: "We work alongside our clients as trusted partners, providing transparent communication and collaborative problem-solving."
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "We stay ahead of emerging threats through continuous learning, research, and adoption of cutting-edge security technologies."
  }
];

const certifications = [
  { name: "ISO 27001", org: "Information Security Management", icon: FileCheck },
  { name: "CEH", org: "Certified Ethical Hacker", icon: Shield },
  { name: "OSCP", org: "Offensive Security Certified Professional", icon: Lock },
  { name: "CISSP", org: "Certified Information Systems Security Professional", icon: Award },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Security Assessments" },
  { value: "100+", label: "Enterprise Clients" },
  { value: "50+", label: "Security Experts" },
];

const milestones = [
  { year: "2014", title: "Company Founded", desc: "Established in Jakarta with mission to elevate Indonesia's cybersecurity landscape" },
  { year: "2016", title: "ISO 27001 Certified", desc: "Achieved international security management certification" },
  { year: "2018", title: "Expanded Services", desc: "Launched managed SOC and incident response capabilities" },
  { year: "2020", title: "National Recognition", desc: "Recognized as leading cybersecurity firm by industry awards" },
  { year: "2022", title: "Regional Growth", desc: "Expanded operations to serve clients across Southeast Asia" },
  { year: "2024", title: "Innovation Hub", desc: "Opened AI-powered threat intelligence research center" },
];

const team = [
  {
    name: "Ahmad Rizki",
    role: "Chief Executive Officer",
    bio: "15+ years in cybersecurity, former CISO at major financial institution. CISSP, CISM certified.",
    image: null // Add image path when available
  },
  {
    name: "Dewi Santoso",
    role: "Chief Technology Officer",
    bio: "Expert in offensive security and threat intelligence. OSCP, OSCE certified ethical hacker.",
    image: null
  },
  {
    name: "Budi Wijaya",
    role: "Head of Consulting",
    bio: "Specializes in security architecture and compliance. ISO 27001 Lead Auditor, PCI DSS QSA.",
    image: null
  },
  {
    name: "Siti Nurhaliza",
    role: "Head of Incident Response",
    bio: "Former government cyber defense specialist. GCFA, GCIH certified digital forensics expert.",
    image: null
  }
];

export default function AboutPage() {
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
                About Us
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Securing Indonesia&apos;s <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Digital Future</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                PT Cyber Ventures Indonesia is a leading cybersecurity firm dedicated to 
                protecting organizations across Indonesia from evolving digital threats.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Story Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Founded in 2014, PT Cyber Ventures Indonesia emerged from a simple yet 
                    powerful vision: to elevate Indonesia&apos;s cybersecurity posture and protect 
                    organizations from the growing threat of cyber attacks.
                  </p>
                  <p>
                    What began as a small team of passionate security professionals has grown 
                    into one of Indonesia&apos;s most trusted cybersecurity firms. We&apos;ve completed 
                    over 500 security assessments for enterprises across banking, government, 
                    healthcare, and technology sectors.
                  </p>
                  <p>
                    Our team comprises certified ethical hackers, security architects, and 
                    compliance experts who bring deep technical expertise and industry knowledge 
                    to every engagement.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center p-4 rounded-xl bg-bg-elevated/50 border border-border-subtle"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent mb-1">{stat.value}</div>
                      <div className="text-sm text-text-tertiary">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Mission & Vision */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className="group relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-accent-indigo" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                    <p className="text-text-secondary leading-relaxed">
                      To empower Indonesian organizations with world-class cybersecurity capabilities, 
                      enabling them to innovate and grow securely in an increasingly digital world.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group relative p-8 rounded-2xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-accent-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                    <p className="text-text-secondary leading-relaxed">
                      To be the most trusted cybersecurity partner for enterprises in Indonesia 
                      and Southeast Asia, setting the standard for security excellence and innovation.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-bg-secondary/50 border-y border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Core <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The principles that guide our work and define our culture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="group relative flex gap-6 p-6 rounded-xl bg-bg-elevated/50 border border-border-subtle backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.3)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-accent-indigo" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Key milestones in our growth and evolution
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-px" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-cyan border-4 border-bg-secondary md:-translate-x-2 mt-1.5" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                      <div className="inline-block px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-semibold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{milestone.title}</h3>
                      <p className="text-text-secondary text-sm">{milestone.desc}</p>
                    </div>
                    
                    {/* Spacer untuk sisi lain */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-24 bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Certifications</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Industry-recognized credentials held by our team members
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
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
                      <cert.icon className="w-6 h-6 text-accent-indigo" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{cert.name}</h3>
                    <p className="text-sm text-text-tertiary">{cert.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Leadership Team
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Meet the experts guiding our mission to secure Indonesia's digital landscape
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center hover:border-accent-cyan/30 transition-colors"
                >
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-cobalt/20 flex items-center justify-center mx-auto mb-4 border-2 border-accent-cyan/30">
                    <Users className="w-10 h-10 text-accent-cyan/50" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent-cyan text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-text-tertiary text-sm leading-relaxed">{member.bio}</p>
                </div>
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
                Join Our <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Whether you&apos;re looking for security services or interested in joining our team, 
                we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contact"
                  className="relative group inline-flex items-center px-8 py-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <div className="relative px-8 py-4 bg-accent-indigo text-white font-semibold rounded-xl hover:bg-accent-indigo/90 transition-colors">
                    Work With Us
                  </div>
                </Link>
                <Link 
                  href="/careers"
                  className="px-8 py-4 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-indigo hover:text-accent-indigo transition-colors"
                >
                  View Careers
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
