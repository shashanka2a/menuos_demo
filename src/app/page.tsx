"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QRScanScreen } from "@/components/QRScanScreen";
import { MenuScreen } from "@/components/MenuScreen";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";
import { CartCheckout } from "@/components/CartCheckout";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { OrderTracking } from "@/components/OrderTracking";

type Screen = "qr" | "menu" | "cart" | "confirmation" | "tracking";

interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("qr");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item: any) => {
    setCartItems([
      ...cartItems,
      {
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      },
    ]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleTrackOrder = () => {
    setCurrentScreen("tracking");
  };

  const handleBackToHome = () => {
    setCurrentScreen("menu");
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentScreen === "qr" && (
          <QRScanScreen
            key="qr"
            onContinue={() => setCurrentScreen("menu")}
          />
        )}

        {currentScreen === "menu" && (
          <MenuScreen
            key="menu"
            onSelectItem={handleSelectItem}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onViewCart={() => setCurrentScreen("cart")}
          />
        )}

        {currentScreen === "cart" && (
          <CartCheckout
            key="cart"
            cartItems={cartItems}
            onBack={() => setCurrentScreen("menu")}
            onConfirmOrder={() => setCurrentScreen("confirmation")}
          />
        )}

        {currentScreen === "confirmation" && (
          <OrderConfirmation
            key="confirmation"
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentScreen === "tracking" && (
          <OrderTracking
            key="tracking"
            onBackToHome={handleBackToHome}
          />
        )}
      </AnimatePresence>

      {/* Item Details Modal - Shown over any screen */}
      <ItemDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}