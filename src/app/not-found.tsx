"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-accent-cyan" />
          </div>
          <div className="text-left">
            <span className="text-xl font-bold text-foreground tracking-tight block">
              CYBER VENTURES
            </span>
            <span className="text-xs text-accent-cyan font-medium tracking-wider">
              INDONESIA
            </span>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-8">
          <span className="text-9xl font-bold text-gradient">404</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Suggested Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link 
            href="/services"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 transition-colors"
          >
            <Search className="w-5 h-5" />
            Our Services
          </Link>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        {/* Help Text */}
        <p className="mt-12 text-sm text-text-muted">
          If you believe this is an error, please{" "}
          <Link href="/contact" className="text-accent-cyan hover:underline">
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
