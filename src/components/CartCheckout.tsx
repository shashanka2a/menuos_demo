"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Apple, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Separator } from "./ui/separator";

interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartCheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onConfirmOrder: () => void;
}

const tipOptions = [
  { value: "0", label: "No Tip", percentage: 0 },
  { value: "10", label: "10%", percentage: 0.1 },
  { value: "15", label: "15%", percentage: 0.15 },
  { value: "20", label: "20%", percentage: 0.2 },
];

export function CartCheckout({
  cartItems,
  onBack,
  onConfirmOrder,
}: CartCheckoutProps) {
  const [selectedTip, setSelectedTip] = useState("15");
  const [paymentMethod, setPaymentMethod] = useState("apple-pay");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tipPercentage =
    tipOptions.find((t) => t.value === selectedTip)?.percentage || 0;
  const tipAmount = subtotal * tipPercentage;
  const tax = subtotal * 0.0875; // 8.75% tax
  const total = subtotal + tipAmount + tax;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmOrder();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white pb-24"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-[#1C1C1E]">Cart & Checkout</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Cart Items */}
        <div className="mb-6">
          <h2 className="mb-4 text-[#1C1C1E]">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl bg-gray-50"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#1C1C1E] mb-1 text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#1C1C1E]/60 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-[#1C1C1E]">
                  ${item.price.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tip Selection */}
        <div className="mb-6">
          <h2 className="mb-4 text-[#1C1C1E]">Add a Tip</h2>
          <div className="grid grid-cols-4 gap-3">
            {tipOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedTip(option.value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedTip === option.value
                    ? "border-[#F97316] bg-[#F97316]/10"
                    : "border-gray-200"
                }`}
              >
                <div className="text-sm">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="mb-4 text-[#1C1C1E]">Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                onClick={() => setPaymentMethod("apple-pay")}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="apple-pay" id="apple-pay" />
                  <Label htmlFor="apple-pay" className="cursor-pointer flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    <span>Apple Pay</span>
                  </Label>
                </div>
              </div>
              <div
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                onClick={() => setPaymentMethod("google-pay")}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="google-pay" id="google-pay" />
                  <Label htmlFor="google-pay" className="cursor-pointer flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Google Pay</span>
                  </Label>
                </div>
              </div>
              <div
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h2 className="mb-4 text-[#1C1C1E]">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-[#1C1C1E]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#1C1C1E]/70">
              <span>Tip ({(tipPercentage * 100).toFixed(0)}%)</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#1C1C1E]/70">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-[#1C1C1E]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmOrder}
          disabled={isProcessing}
          className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white h-14 rounded-full relative overflow-hidden"
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Confirm & Pay"
          )}
        </Button>
        <p className="text-center text-[#1C1C1E]/40 text-sm mt-3">
          Secure checkout — powered by <span className="text-[#F97316]">MenuOS</span>
        </p>
      </div>
    </motion.div>
  );
}