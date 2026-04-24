"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Shield } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const techRecruitmentLink = { 
  href: "/join-us", 
  label: "Sentinel Gate",
  icon: Terminal,
  isTechnical: true 
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border-subtle"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-12 h-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.png"
                alt="Cyber Ventures Indonesia"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground tracking-tight">
                CYBER VENTURES
              </span>
              <span className="text-xs text-accent-indigo font-medium tracking-wider">
                INDONESIA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-text-secondary hover:text-accent-indigo transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            
            {/* Technical Recruitment Menu Item */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={techRecruitmentLink.href}
                className="relative flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-purple transition-colors duration-200 group glitch-hover"
              >
                <techRecruitmentLink.icon className="w-4 h-4" />
                <span className="font-mono">{techRecruitmentLink.label}</span>
                <Shield className="w-3 h-3 text-accent-indigo" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              {/* Glow effect background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300" />
              <Link
                href="/join-us"
                className="relative block px-5 py-2.5 text-sm font-semibold bg-bg-secondary text-foreground rounded-lg border border-border-subtle hover:border-accent-indigo transition-all duration-200"
              >
                <span className="font-mono tracking-wide">Prove Your Skills</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-accent-indigo hover:bg-accent-indigo/10 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 border-t border-border-subtle">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-accent-indigo hover:bg-accent-indigo/5 rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    {/* Technical Recruitment Mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.1 }}
                    >
                      <Link
                        href="/join-us"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 mx-4 px-4 py-3 text-sm font-medium text-accent-purple hover:text-accent-indigo hover:bg-accent-indigo/5 rounded-lg transition-colors border border-accent-purple/30"
                      >
                        <Terminal className="w-4 h-4" />
                        <span className="font-mono">Sentinel Gate</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    >
                      <Link
                        href="/join-us"
                        onClick={() => setIsOpen(false)}
                        className="block mx-4 mt-2 px-4 py-3 text-sm font-semibold text-center bg-gradient-to-r from-accent-indigo to-accent-purple text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <span className="font-mono">Prove Your Skills</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
