"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ItemDetailsModalProps {
  item: {
    id: string;
    name: string;
    image: string;
  } | null;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

const bases = [
  { id: "spaghetti", name: "Spaghetti", price: 0 },
  { id: "penne", name: "Penne", price: 0 },
  { id: "fettuccine", name: "Fettuccine", price: 0 },
  { id: "linguine", name: "Linguine", price: 0 },
  { id: "rigatoni", name: "Rigatoni", price: 0 },
];

const proteins = [
  { id: "chicken", name: "Grilled Chicken", price: 0 },
  { id: "beef", name: "Italian Sausage", price: 2 },
  { id: "seafood", name: "Shrimp", price: 3 },
  { id: "vegetarian", name: "Mushrooms", price: 0 },
  { id: "meatballs", name: "Meatballs", price: 2.5 },
  { id: "pancetta", name: "Pancetta", price: 2 },
];

const addons = [
  { id: "parmesan", name: "Parmesan Cheese", price: 0 },
  { id: "basil", name: "Fresh Basil", price: 0 },
  { id: "cheese", name: "Mozzarella", price: 1.5 },
  { id: "olives", name: "Kalamata Olives", price: 0.5 },
  { id: "garlic", name: "Roasted Garlic", price: 0.5 },
  { id: "sun-dried", name: "Sun-Dried Tomatoes", price: 1 },
  { id: "artichokes", name: "Artichoke Hearts", price: 1.5 },
  { id: "ricotta", name: "Ricotta Cheese", price: 1 },
];

export function ItemDetailsModal({
  item,
  onClose,
  onAddToCart,
}: ItemDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedBase, setSelectedBase] = useState("spaghetti");
  const [selectedProtein, setSelectedProtein] = useState("chicken");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const basePrice = 12.99;
  const calculateTotal = () => {
    let total = basePrice * quantity;
    const base = bases.find((b) => b.id === selectedBase);
    const protein = proteins.find((p) => p.id === selectedProtein);
    if (base) total += base.price * quantity;
    if (protein) total += protein.price * quantity;
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) total += addon.price * quantity;
    });
    return total;
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
      base: selectedBase,
      protein: selectedProtein,
      addons: selectedAddons,
      notes,
      price: calculateTotal(),
    });
    onClose();
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Hero Image */}
            <div className="relative h-64">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Item Name */}
              <h2 className="mb-2 text-[#1C1C1E]">{item.name}</h2>
              <p className="text-[#1C1C1E]/70 mb-6">
                Customize your perfect bowl
              </p>

              {/* Base Selection */}
              <div className="mb-6">
                <h3 className="mb-3 text-[#1C1C1E]">Choose Your Base</h3>
                <RadioGroup value={selectedBase} onValueChange={setSelectedBase}>
                  <div className="space-y-3">
                    {bases.map((base) => (
                      <div
                        key={base.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                        onClick={() => setSelectedBase(base.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={base.id} id={base.id} />
                          <Label htmlFor={base.id} className="cursor-pointer">
                            {base.name}
                          </Label>
                        </div>
                        {base.price > 0 && (
                          <span className="text-[#1C1C1E]/70 text-sm">
                            +${base.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Protein Selection */}
              <div className="mb-6">
                <h3 className="mb-3 text-[#1C1C1E]">Choose Your Protein</h3>
                <RadioGroup
                  value={selectedProtein}
                  onValueChange={setSelectedProtein}
                >
                  <div className="space-y-3">
                    {proteins.map((protein) => (
                      <div
                        key={protein.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                        onClick={() => setSelectedProtein(protein.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={protein.id} id={protein.id} />
                          <Label htmlFor={protein.id} className="cursor-pointer">
                            {protein.name}
                          </Label>
                        </div>
                        {protein.price > 0 && (
                          <span className="text-[#1C1C1E]/70 text-sm">
                            +${protein.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Add-ons */}
              <div className="mb-6">
                <h3 className="mb-3 text-[#1C1C1E]">Add-ons (Optional)</h3>
                <div className="space-y-3">
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#F97316] transition-colors"
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedAddons.includes(addon.id)}
                          onCheckedChange={() => toggleAddon(addon.id)}
                          id={addon.id}
                        />
                        <Label htmlFor={addon.id} className="cursor-pointer">
                          {addon.name}
                        </Label>
                      </div>
                      {addon.price > 0 && (
                        <span className="text-[#1C1C1E]/70 text-sm">
                          +${addon.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <h3 className="mb-3 text-[#1C1C1E]">
                  Special Instructions
                </h3>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add allergy or spice preferences..."
                  className="resize-none h-24"
                />
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="min-w-8 text-center">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#F97316] hover:bg-[#F97316]/90 text-white h-14 rounded-full"
                >
                  Add to Cart — ${calculateTotal().toFixed(2)}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}