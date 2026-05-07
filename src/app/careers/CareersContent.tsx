'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Users, Award, TrendingUp, ChevronRight, Terminal, Lock, Zap, Target } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Cutting-Edge Projects',
    description: 'Work on challenging cybersecurity projects for enterprise clients',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Learn from Indonesia\'s top cybersecurity professionals',
  },
  {
    icon: Award,
    title: 'Certification Support',
    description: 'Get sponsored for CISSP, CEH, OSCP, and other certifications',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Clear career progression path from analyst to senior consultant',
  },
];

const openPositions = [
  {
    title: 'Security Analyst',
    department: 'Security Operations',
    location: 'Jakarta (Hybrid)',
    type: 'Full-time',
  },
  {
    title: 'Penetration Tester',
    department: 'Offensive Security',
    location: 'Jakarta (Hybrid)',
    type: 'Full-time',
  },
  {
    title: 'Security Engineer',
    department: 'Infrastructure',
    location: 'Jakarta (Hybrid)',
    type: 'Full-time',
  },
  {
    title: 'Incident Responder',
    department: 'SOC',
    location: 'Jakarta (On-site)',
    type: 'Full-time',
  },
  {
    title: 'Security Consultant',
    department: 'Advisory',
    location: 'Jakarta (Hybrid)',
    type: 'Senior',
  },
];

export default function CareersContent() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent-indigo/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent-purple/20 rounded-full blur-[100px]" />
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Terminal className="w-4 h-4" />
            Sentinel Gate Recruitment
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Join <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Cyber Ventures</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Be part of Indonesia&apos;s elite cybersecurity team. We&apos;re looking for passionate 
            security professionals to help protect organizations from evolving cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join-us"
              className="relative group inline-flex items-center justify-center px-8 py-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative inline-flex items-center justify-center px-8 py-4 bg-accent-indigo text-white font-semibold rounded-lg hover:bg-accent-indigo/90 transition-all">
                Apply Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              href="#positions"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-border-default text-foreground font-semibold rounded-lg hover:border-accent-indigo hover:text-accent-indigo transition-all"
            >
              View Openings
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-bg-secondary/50 py-16 mb-16 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Join <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Us</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group relative p-6 bg-bg-elevated/50 rounded-xl border border-border-subtle backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-foreground text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Open <span className="bg-gradient-to-r from-accent-indigo to-accent-purple bg-clip-text text-transparent">Positions</span>
        </motion.h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {openPositions.map((position, index) => (
            <motion.div
              key={position.title}
              className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 bg-bg-elevated/50 rounded-xl border border-border-subtle backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ borderColor: 'rgba(99, 102, 241, 0.5)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-indigo transition-colors">
                  {position.title}
                </h3>
                <p className="text-text-secondary text-sm flex items-center gap-2">
                  <Zap className="w-3 h-3 text-accent-purple" />
                  {position.department} • {position.location}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                <span className="px-3 py-1 bg-accent-indigo/10 text-accent-indigo text-sm rounded-full border border-accent-indigo/30">
                  {position.type}
                </span>
                <Link
                  href="/join-us"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple opacity-90 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative text-white flex items-center">
                    Apply
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 via-accent-purple/10 to-accent-cyan/20" />
          <div className="absolute inset-0 bg-bg-elevated/80 backdrop-blur-sm" />
          <div className="absolute inset-0 border border-border-subtle rounded-2xl" />
          
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-indigo/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Join the Elite
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Our recruitment process is designed to identify the best cybersecurity talent. 
              Join us through our Sentinel Gate recruitment system.
            </p>
            <Link
              href="/join-us"
              className="relative group inline-flex items-center px-8 py-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300" />
              <div className="relative inline-flex items-center px-8 py-4 bg-accent-indigo text-white font-semibold rounded-lg hover:bg-accent-indigo/90 transition-all">
                Begin Application
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
