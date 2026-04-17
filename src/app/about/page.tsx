import type { Metadata } from "next";
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
  HeartHandshake
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
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                About Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Securing Indonesia's <span className="text-gradient">Digital Future</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                PT Cyber Ventures Indonesia is a leading cybersecurity firm dedicated to 
                protecting organizations across Indonesia from evolving digital threats.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Story Content */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Founded in 2014, PT Cyber Ventures Indonesia emerged from a simple yet 
                    powerful vision: to elevate Indonesia's cybersecurity posture and protect 
                    organizations from the growing threat of cyber attacks.
                  </p>
                  <p>
                    What began as a small team of passionate security professionals has grown 
                    into one of Indonesia's most trusted cybersecurity firms. We've completed 
                    over 500 security assessments for enterprises across banking, government, 
                    healthcare, and technology sectors.
                  </p>
                  <p>
                    Our team comprises certified ethical hackers, security architects, and 
                    compliance experts who bring deep technical expertise and industry knowledge 
                    to every engagement. We combine global best practices with local market 
                    understanding to deliver solutions that work for Indonesian organizations.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-accent-cyan mb-1">{stat.value}</div>
                      <div className="text-sm text-text-tertiary">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-bg-elevated border border-border-subtle">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                  <p className="text-text-secondary leading-relaxed">
                    To empower Indonesian organizations with world-class cybersecurity capabilities, 
                    enabling them to innovate and grow securely in an increasingly digital world.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-bg-elevated border border-border-subtle">
                  <div className="w-12 h-12 rounded-xl bg-accent-cobalt/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-accent-cobalt" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                  <p className="text-text-secondary leading-relaxed">
                    To be the most trusted cybersecurity partner for enterprises in Indonesia 
                    and Southeast Asia, setting the standard for security excellence and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The principles that guide our work and define our culture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="flex gap-6 p-6 rounded-xl bg-bg-elevated border border-border-subtle"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-7 h-7 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </div>
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
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Certifications
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Industry-recognized credentials held by our team members
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-bg-elevated border border-border-subtle text-center hover:border-accent-cyan/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-sm text-text-tertiary">{cert.org}</p>
                </div>
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
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Whether you're looking for security services or interested in joining our team, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors glow-cyan"
              >
                Work With Us
              </Link>
              <Link 
                href="/careers"
                className="px-8 py-4 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 transition-colors"
              >
                View Careers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
