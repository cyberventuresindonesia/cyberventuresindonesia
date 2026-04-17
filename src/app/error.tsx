"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, Shield } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-danger" />
          </div>
          <div className="text-left">
            <span className="text-xl font-bold text-foreground tracking-tight block">
              CYBER VENTURES
            </span>
            <span className="text-xs text-danger font-medium tracking-wider">
              INDONESIA
            </span>
          </div>
        </div>

        {/* Error Icon */}
        <div className="w-24 h-24 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-12 h-12 text-danger" />
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="text-6xl font-bold text-danger">500</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h1>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          We're sorry, but something unexpected happened. Our team has been notified 
          and we're working to fix the issue.
        </p>

        {/* Error ID */}
        {error.digest && (
          <div className="mb-8 p-4 rounded-xl bg-bg-elevated border border-border-subtle">
            <p className="text-sm text-text-muted mb-1">Error ID:</p>
            <code className="text-sm font-mono text-danger">{error.digest}</code>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <button 
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan text-background font-semibold rounded-xl hover:bg-accent-cyan/90 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-text-muted">
          If the problem persists, please{" "}
          <Link href="/contact" className="text-accent-cyan hover:underline">
            contact our support team
          </Link>{" "}
          and provide the error ID above.
        </p>
      </div>
    </div>
  );
}
