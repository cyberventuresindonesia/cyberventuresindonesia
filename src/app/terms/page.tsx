import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Cyber Ventures Indonesia',
  description: 'Terms and conditions for using our website and services.',
};

export default function TermsPage() {
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
          <FileText className="w-16 h-16 text-accent-cyan mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing and using the website and services of PT Cyber Ventures Indonesia 
                (&quot;Cyber Ventures&quot;), you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Description of Services
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Cyber Ventures provides cybersecurity services including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Penetration Testing and Vulnerability Assessment</li>
                <li>Security Consulting and Advisory</li>
                <li>Incident Response Services</li>
                <li>Compliance and Audit Services</li>
                <li>Security Training and Recruitment Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Recruitment Assessment Terms
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                By participating in our recruitment assessment process:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>You agree that all assessment results (quiz scores, challenge solutions) are property of Cyber Ventures</li>
                <li>Attempts to cheat, manipulate, or bypass assessment systems will result in immediate disqualification</li>
                <li>Each candidate may attempt the quiz only once unless explicitly authorized by Cyber Ventures</li>
                <li>Sharing of assessment questions, flags, or solutions is strictly prohibited</li>
                <li>Anti-cheat monitoring may be employed during assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-text-secondary leading-relaxed">
                All content, materials, and intellectual property on this website, including but not limited to 
                text, graphics, logos, icons, images, audio clips, and software, are the property of Cyber Ventures 
                or its content suppliers and are protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. User Conduct
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of our systems</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Submit false or misleading information</li>
                <li>Harass, abuse, or harm other users or our staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Cyber Ventures shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of or inability to use our services. 
                This includes damages for loss of profits, goodwill, use, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Confidentiality
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Any non-public information you access through our services, including client data, 
                assessment details, or internal documentation, must be kept confidential. 
                Unauthorized disclosure of confidential information is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Modifications to Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting to this page. Your continued use of our services 
                after any modifications indicates your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Governing Law
              </h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Indonesia. 
                Any disputes arising under these terms shall be subject to the exclusive jurisdiction 
                of the courts of Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Contact Information
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-background rounded-lg border border-border-subtle">
                <p className="text-foreground font-medium">PT Cyber Ventures Indonesia</p>
                <p className="text-text-secondary">Email: legal@cyberventuresindonesia.com</p>
                <p className="text-text-secondary">Address: Jl. Cyber Security No. 123, Jakarta, Indonesia</p>
              </div>
            </section>

          </div>
        </div>

        {/* Agreement Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            By using our website and services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}
