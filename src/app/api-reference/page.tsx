import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Code, 
  Shield, 
  Terminal, 
  Lock, 
  Key,
  AlertTriangle,
  CheckCircle,
  Server,
  Globe,
  FileJson,
  Copy
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Reference | Cyber Ventures Indonesia",
  description: "Complete API documentation for Cyber Ventures security services and threat intelligence.",
};

const endpoints = [
  {
    category: "Threat Intelligence",
    description: "Real-time threat data and indicators of compromise",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/threats",
        description: "Get latest threat intelligence",
        auth: "API Key"
      },
      {
        method: "POST",
        path: "/api/v1/threats/query",
        description: "Query specific threat indicators",
        auth: "API Key"
      },
      {
        method: "GET",
        path: "/api/v1/threats/{id}",
        description: "Get detailed threat information",
        auth: "API Key"
      }
    ]
  },
  {
    category: "Vulnerability Scanning",
    description: "Automated security scanning APIs",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/scans",
        description: "Start a new security scan",
        auth: "API Key"
      },
      {
        method: "GET",
        path: "/api/v1/scans/{id}",
        description: "Get scan status and results",
        auth: "API Key"
      },
      {
        method: "GET",
        path: "/api/v1/scans/{id}/vulnerabilities",
        description: "List vulnerabilities found",
        auth: "API Key"
      }
    ]
  },
  {
    category: "Incident Response",
    description: "Incident management and reporting APIs",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/incidents",
        description: "Report a security incident",
        auth: "OAuth 2.0"
      },
      {
        method: "GET",
        path: "/api/v1/incidents",
        description: "List all incidents",
        auth: "OAuth 2.0"
      },
      {
        method: "PUT",
        path: "/api/v1/incidents/{id}",
        description: "Update incident status",
        auth: "OAuth 2.0"
      }
    ]
  }
];

const codeExamples = {
  curl: `curl -X GET https://api.cyberventures.id/v1/threats \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  
  python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(
    "https://api.cyberventures.id/v1/threats",
    headers=headers
)

print(response.json())`,
  
  javascript: `const response = await fetch('https://api.cyberventures.id/v1/threats', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
};

export default function ApiReferencePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-bg-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6">
                <Code className="w-4 h-4" />
                API Reference
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Security <span className="text-gradient">APIs</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8">
                Integrate with our threat intelligence, scanning, and incident response APIs. 
                Real-time security data at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
                >
                  Get API Access
                </Link>
                <Link
                  href="#endpoints"
                  className="px-8 py-3 border-2 border-border-default text-foreground font-semibold rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
                >
                  View Endpoints
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Base URL */}
        <section className="py-12 border-b border-border-subtle bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-bg-elevated border border-border-subtle">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Base URL</h3>
                  <p className="text-text-secondary">All API requests should be made to:</p>
                </div>
              </div>
              <code className="px-4 py-2 bg-black rounded-lg text-accent-cyan font-mono text-sm">
                https://api.cyberventures.id/v1
              </code>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="py-24" id="auth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-accent-cyan" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Authentication</h2>
              </div>
              <p className="text-text-secondary max-w-3xl">
                All API requests require authentication using an API key or OAuth 2.0 token. 
                Include your key in the Authorization header.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  API Key Authentication
                </h3>
                <div className="space-y-4 text-text-secondary">
                  <p>Include your API key in the Authorization header:</p>
                  <code className="block p-4 bg-black rounded-lg font-mono text-sm text-accent-cyan">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                  <p className="text-sm">
                    API keys are available for all plans. Keep your keys secure and never expose them in client-side code.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent-indigo" />
                  OAuth 2.0
                </h3>
                <div className="space-y-4 text-text-secondary">
                  <p>For enterprise integrations, use OAuth 2.0 for enhanced security:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-cyan">1.</span>
                      Register your application
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-cyan">2.</span>
                      Obtain client credentials
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-cyan">3.</span>
                      Request access tokens
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-cyan">4.</span>
                      Use tokens in API requests
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="py-24 bg-bg-secondary/50 border-y border-border-subtle" id="endpoints">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">API Endpoints</h2>
              <p className="text-text-secondary max-w-3xl">
                Our REST API provides access to threat intelligence, vulnerability scanning, 
                and incident management capabilities.
              </p>
            </div>

            <div className="space-y-12">
              {endpoints.map((category, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-accent-cyan" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{category.category}</h3>
                      <p className="text-text-secondary text-sm">{category.description}</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-bg-elevated border-b border-border-subtle">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Method</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Endpoint</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Description</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Auth</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {category.endpoints.map((endpoint, eIndex) => (
                          <tr key={eIndex} className="hover:bg-bg-elevated/50">
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                                endpoint.method === "GET" ? "bg-success/20 text-success" :
                                endpoint.method === "POST" ? "bg-accent-cyan/20 text-accent-cyan" :
                                "bg-warning/20 text-warning"
                              }`}>
                                {endpoint.method}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <code className="text-sm font-mono text-accent-cyan">{endpoint.path}</code>
                            </td>
                            <td className="px-6 py-4 text-text-secondary">{endpoint.description}</td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-text-tertiary">{endpoint.auth}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-accent-cyan" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Code Examples</h2>
              </div>
              <p className="text-text-secondary max-w-3xl">
                Quick start examples in multiple programming languages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(codeExamples).map(([lang, code], index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between p-4 bg-bg-elevated border border-border-subtle rounded-t-xl">
                    <span className="font-semibold text-foreground capitalize">{lang}</span>
                    <button className="text-text-muted hover:text-accent-cyan transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 bg-black rounded-b-xl overflow-x-auto">
                    <code className="text-sm font-mono text-text-secondary">{code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="py-24 bg-bg-secondary/50 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-bg-elevated border border-border-subtle">
                <h3 className="font-semibold text-foreground mb-2">Free Tier</h3>
                <p className="text-2xl font-bold text-accent-cyan mb-1">100</p>
                <p className="text-text-secondary text-sm">requests/day</p>
              </div>
              <div className="p-6 rounded-xl bg-bg-elevated border border-border-subtle">
                <h3 className="font-semibold text-foreground mb-2">Pro Tier</h3>
                <p className="text-2xl font-bold text-accent-cyan mb-1">10,000</p>
                <p className="text-text-secondary text-sm">requests/day</p>
              </div>
              <div className="p-6 rounded-xl bg-bg-elevated border border-border-subtle">
                <h3 className="font-semibold text-foreground mb-2">Enterprise</h3>
                <p className="text-2xl font-bold text-accent-cyan mb-1">Unlimited</p>
                <p className="text-text-secondary text-sm">Custom limits</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to integrate?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Get access to our APIs and start building security into your applications.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
            >
              Request API Access
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
