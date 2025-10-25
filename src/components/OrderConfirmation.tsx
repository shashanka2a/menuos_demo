"use client";

import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed } from "lucide-react";
import { Button } from "./ui/button";

interface OrderConfirmationProps {
  onTrackOrder: () => void;
}

export function OrderConfirmation({ onTrackOrder }: OrderConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#FFEDD5] to-white flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="relative">
              <CheckCircle2 className="w-32 h-32 text-[#22C55E]" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-2 -right-2 bg-[#FFD60A] rounded-full p-3"
              >
                <UtensilsCrossed className="w-8 h-8 text-[#1C1C1E]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-4 text-[#1C1C1E]"
        >
          Order Confirmed 🍲
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#1C1C1E]/70 mb-8"
        >
          Your order will be ready in ~18 minutes.
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[#1C1C1E]/60 text-sm mb-1">Order Number</p>
              <p className="text-[#1C1C1E] text-xl">#042</p>
            </div>
            <div className="text-right">
              <p className="text-[#1C1C1E]/60 text-sm mb-1">Pickup Location</p>
              <p className="text-[#1C1C1E] text-xl">Table 6</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "33%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="bg-[#F97316] h-2 rounded-full"
            />
          </div>
          <p className="text-[#1C1C1E]/60 text-sm">Preparing your order...</p>
        </motion.div>

        {/* Track Order Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <Button
            onClick={onTrackOrder}
            className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white h-14 rounded-full"
          >
            Track Order →
          </Button>
        </motion.div>

        {/* Powered by MenuOS */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-[#1C1C1E]/40 text-sm text-center"
        >
          Powered by <span className="text-[#F97316]">MenuOS</span>
          <br />
          <span className="text-xs">Digital Menu OS for Restaurants</span>
        </motion.p>
      </div>
    </motion.div>
  );
}