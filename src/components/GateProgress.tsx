"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, CheckCircle, Shield, Terminal, Swords } from "lucide-react";

interface GateProgressProps {
  currentGate: number; // 0, 1, 2, 3, 4
  gates?: {
    id: number;
    name: string;
    icon: React.ElementType;
    description: string;
  }[];
}

const defaultGates = [
  { id: 0, name: "Application", icon: Shield, description: "Submit your details" },
  { id: 1, name: "Tech Quiz", icon: Terminal, description: "15 questions, 5 min" },
  { id: 2, name: "Challenges", icon: Lock, description: "Solve 3+ CTF flags" },
  { id: 3, name: "Live Defense", icon: Swords, description: "Real-time incident" },
  { id: 4, name: "Approved", icon: CheckCircle, description: "Welcome aboard" },
];

export default function GateProgress({ currentGate, gates = defaultGates }: GateProgressProps) {
  return (
    <div className="w-full">
      {/* Desktop - Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border-default" />
          
          {/* Progress Line Fill */}
          <motion.div 
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentGate / (gates.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Gates */}
          <div className="relative flex justify-between">
            {gates.map((gate, index) => {
              const isCompleted = index < currentGate;
              const isCurrent = index === currentGate;
              const isLocked = index > currentGate;

              return (
                <div key={gate.id} className="flex flex-col items-center">
                  {/* Icon Circle */}
                  <motion.div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                      isCompleted
                        ? "bg-accent-indigo border-accent-indigo"
                        : isCurrent
                        ? "bg-bg-elevated border-accent-indigo shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                        : "bg-bg-secondary border-border-default"
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-text-muted" />
                    ) : (
                      <gate.icon className="w-5 h-5 text-accent-indigo" />
                    )}

                    {/* Pulse animation for current */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent-indigo"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-semibold ${
                      isCompleted || isCurrent ? "text-foreground" : "text-text-muted"
                    }`}>
                      Gate {gate.id}: {gate.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{gate.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile - Vertical */}
      <div className="md:hidden">
        <div className="relative space-y-4">
          {/* Vertical Line Background */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-border-default" />
          
          {/* Vertical Line Fill */}
          <motion.div 
            className="absolute left-5 top-4 w-0.5 bg-gradient-to-b from-accent-indigo to-accent-purple"
            initial={{ height: "0%" }}
            animate={{ height: `${(currentGate / (gates.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {gates.map((gate, index) => {
            const isCompleted = index < currentGate;
            const isCurrent = index === currentGate;
            const isLocked = index > currentGate;

            return (
              <motion.div
                key={gate.id}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 flex-shrink-0 ${
                  isCompleted
                    ? "bg-accent-indigo border-accent-indigo"
                    : isCurrent
                    ? "bg-bg-elevated border-accent-indigo shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    : "bg-bg-secondary border-border-default"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4 text-text-muted" />
                  ) : (
                    <gate.icon className="w-4 h-4 text-accent-indigo" />
                  )}

                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent-indigo"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pt-1.5">
                  <p className={`text-sm font-semibold ${
                    isCompleted || isCurrent ? "text-foreground" : "text-text-muted"
                  }`}>
                    Gate {gate.id}: {gate.name}
                  </p>
                  <p className="text-xs text-text-muted">{gate.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
