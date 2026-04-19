import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, Users, Award, TrendingUp, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Cyber Ventures Indonesia',
  description: 'Join our team of cybersecurity experts. Explore career opportunities at Cyber Ventures Indonesia.',
};

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

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join <span className="text-accent-cyan">Cyber Ventures</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Be part of Indonesia&apos;s elite cybersecurity team. We&apos;re looking for passionate 
            security professionals to help protect organizations from evolving cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join-us"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-cyan text-background font-semibold rounded-lg hover:bg-accent-cyan/90 transition-all glow-cyan"
            >
              Apply Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#positions"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan/10 transition-all"
            >
              View Openings
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-bg-secondary py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Join <span className="text-accent-cyan">Us</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 bg-background rounded-xl border border-border-subtle hover:border-accent-cyan/50 transition-all"
              >
                <benefit.icon className="w-12 h-12 text-accent-cyan mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Open <span className="text-accent-cyan">Positions</span>
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {openPositions.map((position) => (
            <div
              key={position.title}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-bg-secondary rounded-xl border border-border-subtle hover:border-accent-cyan transition-all group"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-cyan transition-colors">
                  {position.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {position.department} • {position.location}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-sm rounded-full">
                  {position.type}
                </span>
                <Link
                  href="/join-us"
                  className="inline-flex items-center px-4 py-2 bg-accent-cyan text-background text-sm font-medium rounded-lg hover:bg-accent-cyan/90 transition-colors"
                >
                  Apply
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-accent-cyan/20 to-blue-500/20 rounded-2xl p-8 md:p-12 text-center border border-accent-cyan/30">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Our recruitment process is designed to identify the best cybersecurity talent. 
            Join us through our Sentinel Gate recruitment system.
          </p>
          <Link
            href="/join-us"
            className="inline-flex items-center px-8 py-4 bg-accent-cyan text-background font-semibold rounded-lg hover:bg-accent-cyan/90 transition-all glow-cyan"
          >
            Begin Application
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
