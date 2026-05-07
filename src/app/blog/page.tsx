'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Clock,
  ArrowRight,
  Tag,
  TrendingUp,
  Lock,
  Server,
  Globe,
  Zap,
  Eye,
  Loader2,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "All", count: 12 },
  { name: "Threat Intelligence", count: 5 },
  { name: "Vulnerability Alerts", count: 3 },
  { name: "Industry Insights", count: 2 },
  { name: "Best Practices", count: 4 },
];

const featuredReport = {
  title: "Q4 2024 Indonesia Cyber Threat Landscape Report",
  excerpt: "Comprehensive analysis of cyber threats targeting Indonesian organizations, including ransomware trends, phishing campaigns, and nation-state actor activities observed in the fourth quarter of 2024.",
  category: "Threat Intelligence",
  date: "December 15, 2024",
  readTime: "15 min read",
  icon: Shield,
  tags: ["Ransomware", "Phishing", "Threat Trends", "Indonesia"]
};

const reports = [
  {
    title: "Critical Vulnerability: CVE-2024-XXXX in Enterprise Software",
    excerpt: "A critical remote code execution vulnerability has been discovered in widely-used enterprise software. Immediate patching is recommended for all organizations.",
    category: "Vulnerability Alerts",
    date: "December 10, 2024",
    readTime: "5 min read",
    icon: AlertTriangle,
    tags: ["CVE", "Critical", "Patching"],
    severity: "Critical"
  },
  {
    title: "Banking Sector Under Siege: New APT Group Targeting Indonesian Financial Institutions",
    excerpt: "Analysis of a sophisticated APT campaign targeting major Indonesian banks with advanced persistent threats and custom malware.",
    category: "Threat Intelligence",
    date: "December 5, 2024",
    readTime: "12 min read",
    icon: Lock,
    tags: ["APT", "Banking", "Malware"]
  },
  {
    title: "Cloud Security Best Practices for Indonesian Enterprises",
    excerpt: "Essential security configurations and practices for organizations migrating to AWS, Azure, and Google Cloud Platform.",
    category: "Best Practices",
    date: "November 28, 2024",
    readTime: "8 min read",
    icon: Server,
    tags: ["Cloud", "AWS", "Security"]
  },
  {
    title: "Supply Chain Security: Lessons from Recent Global Incidents",
    excerpt: "Examining recent supply chain attacks and providing actionable guidance for Indonesian organizations to protect their software supply chains.",
    category: "Industry Insights",
    date: "November 20, 2024",
    readTime: "10 min read",
    icon: Globe,
    tags: ["Supply Chain", "Third Party", "Risk"]
  },
  {
    title: "Zero-Day Exploit Targeting Web Applications in the Wild",
    excerpt: "Active exploitation of a zero-day vulnerability in popular web application frameworks. Detection rules and mitigation strategies included.",
    category: "Vulnerability Alerts",
    date: "November 15, 2024",
    readTime: "6 min read",
    icon: Zap,
    tags: ["Zero-Day", "Web App", "Exploit"],
    severity: "High"
  },
  {
    title: "Implementing Zero Trust Architecture: A Practical Guide",
    excerpt: "Step-by-step guide for Indonesian enterprises looking to implement Zero Trust security architecture, from strategy to deployment.",
    category: "Best Practices",
    date: "November 8, 2024",
    readTime: "20 min read",
    icon: Shield,
    tags: ["Zero Trust", "Architecture", "Guide"]
  },
  {
    title: "Ransomware Evolution: New Tactics Observed in Q4 2024",
    excerpt: "Analysis of emerging ransomware techniques including double extortion, triple extortion, and data leak site monitoring strategies.",
    category: "Threat Intelligence",
    date: "November 1, 2024",
    readTime: "15 min read",
    icon: AlertTriangle,
    tags: ["Ransomware", "Extortion", "Q4"],
    severity: "High"
  },
  {
    title: "Securing Remote Workforce: Post-Pandemic Security Framework",
    excerpt: "Comprehensive security framework for organizations with distributed teams, including VPN, Zero Trust Network Access, and endpoint protection.",
    category: "Best Practices",
    date: "October 25, 2024",
    readTime: "18 min read",
    icon: Shield,
    tags: ["Remote Work", "VPN", "ZTNA"]
  },
  {
    title: "Critical Infrastructure Cyber Attacks: Indonesia Power Grid Analysis",
    excerpt: "In-depth analysis of recent cyber attacks targeting Indonesian critical infrastructure and recommendations for OT security.",
    category: "Threat Intelligence",
    date: "October 18, 2024",
    readTime: "14 min read",
    icon: Lock,
    tags: ["Critical Infrastructure", "OT", "ICS"],
    severity: "Critical"
  },
  {
    title: "DevSecOps Implementation Guide for Indonesian Tech Companies",
    excerpt: "Practical guide to integrating security into CI/CD pipelines, including tool recommendations and process workflows.",
    category: "Industry Insights",
    date: "October 12, 2024",
    readTime: "22 min read",
    icon: FileText,
    tags: ["DevSecOps", "CI/CD", "Automation"]
  },
  {
    title: "New Phishing Campaign Targeting E-Commerce Platforms",
    excerpt: "Detailed analysis of sophisticated phishing attacks targeting Indonesian e-commerce platforms and consumer protection strategies.",
    category: "Threat Intelligence",
    date: "October 5, 2024",
    readTime: "8 min read",
    icon: AlertTriangle,
    tags: ["Phishing", "E-Commerce", "Social Engineering"],
    severity: "High"
  },
  {
    title: "Container Security: Kubernetes Best Practices",
    excerpt: "Essential security configurations for Kubernetes deployments, including pod security, network policies, and runtime protection.",
    category: "Best Practices",
    date: "September 28, 2024",
    readTime: "16 min read",
    icon: Server,
    tags: ["Kubernetes", "Containers", "DevOps"]
  }
];

const threatStats = [
  { label: "Attacks Blocked (Monthly)", value: "2.4M+" },
  { label: "Threat Actors Monitored", value: "150+" },
  { label: "Vulnerabilities Disclosed", value: "500+" },
  { label: "Clients Protected", value: "100+" }
];

export default function BlogPage() {
  const [visibleReports, setVisibleReports] = useState(6);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleLoadMore = () => {
    setVisibleReports(prev => Math.min(prev + 6, reports.length));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    
    setSubscribeStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: subscribeEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus('success');
      setSubscribeEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (err) {
      setSubscribeStatus('idle');
      alert(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    }
  };

  const displayedReports = reports.slice(0, visibleReports);
  const hasMoreReports = visibleReports < reports.length;

  const filteredReports = selectedCategory === 'All' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);
  
  const displayedFilteredReports = filteredReports.slice(0, visibleReports);
  const hasMoreFilteredReports = visibleReports < filteredReports.length;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleReports(6); // Reset visible count when category changes
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
                <Eye className="w-4 h-4 inline mr-2" />
                Cyber Reports & Insights
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Threat Intelligence <span className="text-gradient">Reports</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                Stay ahead of cyber threats with our in-depth security analysis, 
                vulnerability alerts, and industry insights tailored for Indonesian enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 border-y border-border-subtle bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {threatStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-cyan mb-1">{stat.value}</div>
                  <div className="text-sm text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-text-tertiary mr-2">Filter by:</span>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-accent-cyan text-background' 
                      : 'bg-bg-elevated text-text-secondary hover:text-accent-cyan border border-border-subtle'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Report */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent-cyan/10 to-accent-cobalt/10 border border-accent-cyan/30">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent-cyan/20 flex items-center justify-center">
                  <featuredReport.icon className="w-8 h-8 text-accent-cyan" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-sm font-medium mb-2">
                    {featuredReport.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {featuredReport.title}
                  </h2>
                </div>
              </div>
              
              <p className="text-text-secondary text-lg leading-relaxed mb-6 max-w-4xl">
                {featuredReport.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {featuredReport.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bg-elevated text-text-secondary text-sm border border-border-subtle"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-text-tertiary">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredReport.readTime}
                  </span>
                  <span>{featuredReport.date}</span>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors">
                  Read Full Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Latest Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFilteredReports.map((report, index) => (
                <article 
                  key={index}
                  className="group p-6 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-cyan/50 transition-all duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                      <report.icon className="w-6 h-6 text-accent-cyan" />
                    </div>
                    {report.severity && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.severity === 'Critical' 
                          ? 'bg-danger/20 text-danger' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {report.severity}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <span className="text-accent-cyan text-sm font-medium mb-2">
                    {report.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent-cyan transition-colors line-clamp-2">
                    {report.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {report.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.tags.map((tag, tIndex) => (
                      <span 
                        key={tIndex}
                        className="px-2 py-1 rounded bg-bg-tertiary text-text-tertiary text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.readTime}
                      </span>
                      <span>{report.date}</span>
                    </div>
                    <button className="text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            {hasMoreFilteredReports && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="px-8 py-4 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 transition-colors"
                >
                  Load More Reports ({filteredReports.length - visibleReports} remaining)
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-24 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-accent-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Subscribe to Threat Alerts
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Get instant notifications for critical vulnerabilities, emerging threats, 
              and security advisories directly to your inbox.
            </p>
            
            {subscribeStatus === 'success' ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Successfully subscribed! Check your email for confirmation.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-bg-elevated border border-border-default rounded-xl text-foreground placeholder-text-muted focus:border-accent-cyan focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-6 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {subscribeStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
            <p className="text-xs text-text-muted mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
