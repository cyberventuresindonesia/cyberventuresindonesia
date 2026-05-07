import { NextRequest, NextResponse } from 'next/server';

// Static blog reports data (same as in blog/page.tsx)
const reports = [
  {
    id: 1,
    title: "Critical Vulnerability: CVE-2024-XXXX in Enterprise Software",
    excerpt: "A critical remote code execution vulnerability has been discovered in widely-used enterprise software. Immediate patching is recommended for all organizations.",
    category: "Vulnerability Alerts",
    date: "December 10, 2024",
    readTime: "5 min read",
    severity: "Critical",
    tags: ["CVE", "Critical", "Patching"]
  },
  {
    id: 2,
    title: "Banking Sector Under Siege: New APT Group Targeting Indonesian Financial Institutions",
    excerpt: "Analysis of a sophisticated APT campaign targeting major Indonesian banks with advanced persistent threats and custom malware.",
    category: "Threat Intelligence",
    date: "December 5, 2024",
    readTime: "12 min read",
    tags: ["APT", "Banking", "Malware"]
  },
  {
    id: 3,
    title: "Cloud Security Best Practices for Indonesian Enterprises",
    excerpt: "Essential security configurations and practices for organizations migrating to AWS, Azure, and Google Cloud Platform.",
    category: "Best Practices",
    date: "November 28, 2024",
    readTime: "8 min read",
    tags: ["Cloud", "AWS", "Security"]
  },
  {
    id: 4,
    title: "Supply Chain Security: Lessons from Recent Global Incidents",
    excerpt: "Examining recent supply chain attacks and providing actionable guidance for Indonesian organizations to protect their software supply chains.",
    category: "Industry Insights",
    date: "November 20, 2024",
    readTime: "10 min read",
    tags: ["Supply Chain", "Third Party", "Risk"]
  },
  {
    id: 5,
    title: "Zero-Day Exploit Targeting Web Applications in the Wild",
    excerpt: "Active exploitation of a zero-day vulnerability in popular web application frameworks. Detection rules and mitigation strategies included.",
    category: "Vulnerability Alerts",
    date: "November 15, 2024",
    readTime: "6 min read",
    severity: "High",
    tags: ["Zero-Day", "Web App", "Exploit"]
  },
  {
    id: 6,
    title: "Implementing Zero Trust Architecture: A Practical Guide",
    excerpt: "Step-by-step guide for Indonesian enterprises looking to implement Zero Trust security architecture, from strategy to deployment.",
    category: "Best Practices",
    date: "November 8, 2024",
    readTime: "20 min read",
    tags: ["Zero Trust", "Architecture", "Guide"]
  },
  {
    id: 7,
    title: "Ransomware Evolution: New Tactics Observed in Q4 2024",
    excerpt: "Analysis of emerging ransomware techniques including double extortion, triple extortion, and data leak site monitoring strategies.",
    category: "Threat Intelligence",
    date: "November 1, 2024",
    readTime: "15 min read",
    severity: "High",
    tags: ["Ransomware", "Extortion", "Q4"]
  },
  {
    id: 8,
    title: "Securing Remote Workforce: Post-Pandemic Security Framework",
    excerpt: "Comprehensive security framework for organizations with distributed teams, including VPN, Zero Trust Network Access, and endpoint protection.",
    category: "Best Practices",
    date: "October 25, 2024",
    readTime: "18 min read",
    tags: ["Remote Work", "VPN", "ZTNA"]
  },
  {
    id: 9,
    title: "Critical Infrastructure Cyber Attacks: Indonesia Power Grid Analysis",
    excerpt: "In-depth analysis of recent cyber attacks targeting Indonesian critical infrastructure and recommendations for OT security.",
    category: "Threat Intelligence",
    date: "October 18, 2024",
    readTime: "14 min read",
    severity: "Critical",
    tags: ["Critical Infrastructure", "OT", "ICS"]
  },
  {
    id: 10,
    title: "DevSecOps Implementation Guide for Indonesian Tech Companies",
    excerpt: "Practical guide to integrating security into CI/CD pipelines, including tool recommendations and process workflows.",
    category: "Industry Insights",
    date: "October 12, 2024",
    readTime: "22 min read",
    tags: ["DevSecOps", "CI/CD", "Automation"]
  },
  {
    id: 11,
    title: "New Phishing Campaign Targeting E-Commerce Platforms",
    excerpt: "Detailed analysis of sophisticated phishing attacks targeting Indonesian e-commerce platforms and consumer protection strategies.",
    category: "Threat Intelligence",
    date: "October 5, 2024",
    readTime: "8 min read",
    severity: "High",
    tags: ["Phishing", "E-Commerce", "Social Engineering"]
  },
  {
    id: 12,
    title: "Container Security: Kubernetes Best Practices",
    excerpt: "Essential security configurations for Kubernetes deployments, including pod security, network policies, and runtime protection.",
    category: "Best Practices",
    date: "September 28, 2024",
    readTime: "16 min read",
    tags: ["Kubernetes", "Containers", "DevOps"]
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '12');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Filter by category if provided
  let filteredReports = reports;
  if (category && category !== 'All') {
    filteredReports = reports.filter(report => report.category === category);
  }

  // Apply pagination
  const paginatedReports = filteredReports.slice(offset, offset + limit);

  return NextResponse.json({
    reports: paginatedReports,
    total: filteredReports.length,
    offset,
    limit,
    hasMore: offset + limit < filteredReports.length
  });
}
