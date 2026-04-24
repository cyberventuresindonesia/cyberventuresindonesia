"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Shield, Clock, Award, Globe } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Candidates Trained",
    description: "Security professionals trained",
    color: "indigo",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Certification pass rate",
    color: "purple",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Round-the-clock assistance",
    color: "cyan",
  },
  {
    icon: Shield,
    value: 50,
    suffix: "+",
    label: "Enterprise Clients",
    description: "Fortune 500 & government",
    color: "green",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Industry Awards",
    description: "Recognition for excellence",
    color: "yellow",
  },
  {
    icon: Globe,
    value: 100,
    suffix: "%",
    label: "Indonesian Owned",
    description: "Proudly local company",
    color: "red",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-accent-indigo/10", text: "text-accent-indigo", border: "border-accent-indigo/30" },
  purple: { bg: "bg-accent-purple/10", text: "text-accent-purple", border: "border-accent-purple/30" },
  cyan: { bg: "bg-accent-cyan/10", text: "text-accent-cyan", border: "border-accent-cyan/30" },
  green: { bg: "bg-success/10", text: "text-success", border: "border-success/30" },
  yellow: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  red: { bg: "bg-danger/10", text: "text-danger", border: "border-danger/30" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
  },
};

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-tertiary via-bg-secondary to-bg-tertiary" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-indigo/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Our track record demonstrates commitment to excellence in cybersecurity 
            training and enterprise security solutions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => {
            const colors = colorClasses[stat.color];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`relative p-6 rounded-2xl bg-bg-elevated/50 border ${colors.border} hover:bg-bg-elevated transition-all duration-300 hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  
                  {/* Value */}
                  <div className={`text-3xl sm:text-4xl font-bold font-mono ${colors.text} mb-1`}>
                    <AnimatedCounter 
                      end={stat.value} 
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-text-muted">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Statement */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-text-secondary">
            Trusted by leading organizations across Indonesia including{" "}
            <span className="text-accent-indigo font-medium">Bank Indonesia</span>,{" "}
            <span className="text-accent-purple font-medium">Telkom</span>, and{" "}
            <span className="text-accent-cyan font-medium">Ministry of Defense</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
