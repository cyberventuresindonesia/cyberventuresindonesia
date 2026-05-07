import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Cookie, ChevronLeft, Shield, Settings, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Cyber Ventures Indonesia",
  description: "Information about how we use cookies and similar technologies on our website.",
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    icon: Shield,
    description: "Required for the website to function properly",
    examples: ["Session cookies", "Authentication tokens", "Security cookies"],
    required: true
  },
  {
    name: "Analytics Cookies",
    icon: Info,
    description: "Help us understand how visitors interact with our website",
    examples: ["Google Analytics", "Page view tracking", "User behavior analysis"],
    required: false
  },
  {
    name: "Preference Cookies",
    icon: Settings,
    description: "Remember your settings and preferences",
    examples: ["Language preferences", "Theme settings", "Form auto-fill"],
    required: false
  }
];

export default function CookiePolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center text-text-secondary hover:text-accent-cyan transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <Cookie className="w-16 h-16 text-accent-cyan mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-text-secondary">
              Last updated: January 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-bg-secondary rounded-xl p-8 border border-border-subtle space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit a website. 
                  They help websites remember your preferences, understand how you use the site, 
                  and improve your browsing experience. We also use similar technologies like web beacons 
                  and local storage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Cyber Ventures Indonesia uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Ensure the website functions correctly</li>
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide secure authentication</li>
                </ul>
              </section>

              {/* Cookie Types */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  3. Types of Cookies We Use
                </h2>
                <div className="grid gap-4">
                  {cookieTypes.map((type, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-bg-elevated border border-border-subtle"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                          <type.icon className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{type.name}</h3>
                            {type.required && (
                              <span className="px-2 py-1 rounded bg-accent-cyan/20 text-accent-cyan text-xs font-medium">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-text-secondary mb-3">{type.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-bg-secondary text-text-tertiary text-sm"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
                  <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                  <li><strong>Cloudflare:</strong> For security and performance</li>
                  <li><strong>LinkedIn/Twitter:</strong> For social media integration</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  These third parties have their own privacy policies and cookie practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Managing Cookies
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  You can control and manage cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  Please note that disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Cookie Duration
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Cookies we use have different lifespans:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain for a set period (30 days to 1 year)</li>
                  <li><strong>Authentication Cookies:</strong> Typically expire after 24 hours</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Updates to This Policy
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Cookie Policy from time to time. Changes will be posted on this page 
                  with an updated revision date. Continued use of our website after changes indicates 
                  your acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Contact Us
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  If you have questions about our Cookie Policy or how we use cookies:
                </p>
                <div className="p-4 bg-bg-elevated rounded-lg border border-border-subtle">
                  <p className="text-foreground font-medium">PT Cyber Ventures Indonesia</p>
                  <p className="text-text-secondary">Email: privacy@cyberventuresindonesia.com</p>
                  <p className="text-text-secondary">Address: Jl. Cyber Security No. 123, Jakarta, Indonesia</p>
                </div>
              </section>

            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="px-6 py-3 bg-bg-elevated border border-border-subtle text-foreground rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="px-6 py-3 bg-bg-elevated border border-border-subtle text-foreground rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
