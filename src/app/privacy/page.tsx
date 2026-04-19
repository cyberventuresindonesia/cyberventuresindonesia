import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cyber Ventures Indonesia',
  description: 'Our commitment to protecting your privacy and personal data.',
};

export default function PrivacyPage() {
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
          <Shield className="w-16 h-16 text-accent-cyan mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
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
                1. Introduction
              </h2>
              <p className="text-text-secondary leading-relaxed">
                PT Cyber Ventures Indonesia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and resume details when you apply for positions</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
                <li><strong>Usage Data:</strong> How you interact with our website and services</li>
                <li><strong>Recruitment Data:</strong> Quiz scores, challenge results, and assessment performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Process job applications and manage recruitment</li>
                <li>Provide and improve our cybersecurity services</li>
                <li>Communicate with you about opportunities and updates</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Data Security
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational security measures to protect 
                your personal data against unauthorized access, alteration, disclosure, or destruction. 
                This includes encryption, secure servers, and access controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Data Retention
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal data for as long as necessary to fulfill the purposes 
                outlined in this Privacy Policy, unless a longer retention period is required by law. 
                Recruitment data is typically retained for 2 years.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Your Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Contact Us
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-background rounded-lg border border-border-subtle">
                <p className="text-foreground font-medium">PT Cyber Ventures Indonesia</p>
                <p className="text-text-secondary">Email: privacy@cyberventuresindonesia.com</p>
                <p className="text-text-secondary">Address: Jl. Cyber Security No. 123, Jakarta, Indonesia</p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            By using our website, you agree to the collection and use of information 
            in accordance with this Privacy Policy.
          </p>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}
