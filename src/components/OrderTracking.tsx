"use client";

import { motion } from "framer-motion";
import { Check, Clock, UtensilsCrossed, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface OrderTrackingProps {
  onBackToHome: () => void;
}

const orderSteps = [
  {
    id: 1,
    title: "Order Received",
    description: "We've received your order",
    icon: Check,
    status: "completed" as const,
    time: "2:34 PM",
  },
  {
    id: 2,
    title: "Preparing",
    description: "Your meal is being prepared",
    icon: UtensilsCrossed,
    status: "active" as const,
    time: "~10 mins",
  },
  {
    id: 3,
    title: "Ready",
    description: "Order ready to be served",
    icon: Clock,
    status: "pending" as const,
    time: "~8 mins",
  },
];

export function OrderTracking({ onBackToHome }: OrderTrackingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-white pb-24"
    >
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316] rounded-full mb-4"
          >
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="mb-2 text-[#1C1C1E]">Order #042</h1>
          <p className="text-[#1C1C1E]/70">Table 6 • Estimated 18 minutes</p>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="origin-left"
        >
          <Progress value={55} className="h-2" />
        </motion.div>
      </div>

      {/* Order Steps */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="mb-6 text-[#1C1C1E]">Order Status</h2>
          <div className="space-y-6">
            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-[#22C55E]"
                          : step.status === "active"
                          ? "bg-[#F97316]"
                          : "bg-gray-200"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          step.status === "pending"
                            ? "text-gray-400"
                            : "text-white"
                        }`}
                      />
                    </div>
                    {/* Connecting Line */}
                    {index < orderSteps.length - 1 && (
                      <div className="absolute left-1/2 top-12 w-0.5 h-8 -translate-x-1/2 bg-gray-200" />
                    )}
                    {/* Active Pulse */}
                    {step.status === "active" && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-[#F97316]"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        className={`${
                          step.status === "pending"
                            ? "text-[#1C1C1E]/40"
                            : "text-[#1C1C1E]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span
                        className={`text-sm ${
                          step.status === "completed"
                            ? "text-[#22C55E]"
                            : step.status === "active"
                            ? "text-[#F97316]"
                            : "text-gray-400"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        step.status === "pending"
                          ? "text-[#1C1C1E]/40"
                          : "text-[#1C1C1E]/70"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="mb-4 text-[#1C1C1E]">Order Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#1C1C1E]/70">
                1x Build Your Own Rice Bowl
              </span>
              <span className="text-[#1C1C1E]">$14.99</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-[#1C1C1E]">Total</span>
                <span className="text-[#1C1C1E]">$16.30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-4 mt-6"
      >
        <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#F97316]/20">
          <p className="text-center text-[#1C1C1E]/70 text-sm">
            Need help? Call the restaurant at{" "}
            <span className="text-[#F97316]">(555) 123-4567</span>
          </p>
        </div>
      </motion.div>

      {/* Back to Menu Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4">
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full h-14 rounded-full border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Menu
        </Button>
      </div>

      {/* Powered by MenuOS */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[#1C1C1E]/40 text-sm mt-6 pb-24"
      >
        Powered by <span className="text-[#F97316]">MenuOS</span>
      </motion.p>
    </motion.div>
  );
}
