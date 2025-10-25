"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MenuItem {
  id: string;
  name: string;
  image: string;
  category: string;
  allergies: string[];
}

interface MenuScreenProps {
  onSelectItem: (item: MenuItem) => void;
  cartCount: number;
  cartTotal: number;
  onViewCart: () => void;
}

const categories = [
  "Popular",
  "Appetizers",
  "Salads",
  "Pasta",
  "Pizza",
  "Calzones",
  "Sandwiches",
  "Entrees",
  "Desserts",
  "Drinks",
];

const allergyOptions = [
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Vegan",
  "Vegetarian",
  "Seafood-Free",
];

const menuItems: MenuItem[] = [
  // Popular Items
  {
    id: "1",
    name: "Spaghetti Bolognese",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Popular",
    allergies: ["Nut-Free"],
  },
  {
    id: "2",
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Popular",
    allergies: ["Vegetarian"],
  },
  {
    id: "3",
    name: "Chicken Parmigiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Popular",
    allergies: ["Nut-Free"],
  },
  {
    id: "4",
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Popular",
    allergies: ["Vegetarian"],
  },
  {
    id: "5",
    name: "Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Popular",
    allergies: ["Vegetarian"],
  },
  
  // Appetizers
  {
    id: "6",
    name: "Fried Calamari",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Seafood-Free"],
  },
  {
    id: "7",
    name: "Bruschetta",
    image: "https://images.unsplash.com/photo-1572441713132-51c75654db73/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Vegetarian"],
  },
  {
    id: "8",
    name: "Mozzarella Sticks",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac667e28f2/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Vegetarian"],
  },
  {
    id: "9",
    name: "Garlic Knots",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Vegetarian"],
  },
  {
    id: "10",
    name: "Arancini",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Vegetarian"],
  },
  {
    id: "11",
    name: "Antipasto Misto",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Appetizers",
    allergies: ["Nut-Free"],
  },
  
  // Salads
  {
    id: "12",
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Vegetarian"],
  },
  {
    id: "13",
    name: "Caprese Salad",
    image: "https://images.unsplash.com/photo-1572441713132-51c75654db73/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Vegetarian"],
  },
  {
    id: "14",
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Vegetarian"],
  },
  {
    id: "15",
    name: "House Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Vegetarian"],
  },
  {
    id: "16",
    name: "Arugula Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Nut-Free"],
  },
  {
    id: "17",
    name: "Spinach Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Salads",
    allergies: ["Vegetarian"],
  },
  
  // Pasta
  {
    id: "18",
    name: "Spaghetti Bolognese",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Nut-Free"],
  },
  {
    id: "19",
    name: "Fettuccine Alfredo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "20",
    name: "Lasagna",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "21",
    name: "Penne Alla Vodka",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "22",
    name: "Ravioli",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "23",
    name: "Gnocchi",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "24",
    name: "Linguine Carbonara",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "25",
    name: "Manicotti",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "26",
    name: "Baked Ziti",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Vegetarian"],
  },
  {
    id: "27",
    name: "Orecchiette",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pasta",
    allergies: ["Nut-Free"],
  },
  
  // Pizza
  {
    id: "28",
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Vegetarian"],
  },
  {
    id: "29",
    name: "Pepperoni Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Nut-Free"],
  },
  {
    id: "30",
    name: "Vegetable Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Vegetarian"],
  },
  {
    id: "31",
    name: "Meat Lovers Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Nut-Free"],
  },
  {
    id: "32",
    name: "Hawaiian Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Nut-Free"],
  },
  {
    id: "33",
    name: "BBQ Chicken Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Nut-Free"],
  },
  {
    id: "34",
    name: "White Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Vegetarian"],
  },
  {
    id: "35",
    name: "Buffalo Chicken Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Nut-Free"],
  },
  {
    id: "36",
    name: "Sicilian Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Vegetarian"],
  },
  {
    id: "37",
    name: "Grandma Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Pizza",
    allergies: ["Vegetarian"],
  },
  
  // Calzones
  {
    id: "38",
    name: "Cheese Calzone",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Calzones",
    allergies: ["Vegetarian"],
  },
  {
    id: "39",
    name: "Spinach Calzone",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Calzones",
    allergies: ["Vegetarian"],
  },
  {
    id: "40",
    name: "Pepperoni Calzone",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Calzones",
    allergies: ["Nut-Free"],
  },
  {
    id: "41",
    name: "Chicken Parm Calzone",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Calzones",
    allergies: ["Nut-Free"],
  },
  
  // Sandwiches
  {
    id: "42",
    name: "Chicken Parm Sandwich",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Sandwiches",
    allergies: ["Nut-Free"],
  },
  {
    id: "43",
    name: "Meatball Parm Sandwich",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Sandwiches",
    allergies: ["Nut-Free"],
  },
  {
    id: "44",
    name: "Philly Cheesesteak",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Sandwiches",
    allergies: ["Nut-Free"],
  },
  {
    id: "45",
    name: "Italian Sub",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Sandwiches",
    allergies: ["Nut-Free"],
  },
  {
    id: "46",
    name: "Sausage & Peppers",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Sandwiches",
    allergies: ["Nut-Free"],
  },
  
  // Entrees
  {
    id: "47",
    name: "Chicken Parmigiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Nut-Free"],
  },
  {
    id: "48",
    name: "Eggplant Parmigiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Vegetarian"],
  },
  {
    id: "49",
    name: "Veal Parmigiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Nut-Free"],
  },
  {
    id: "50",
    name: "Chicken Marsala",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Nut-Free"],
  },
  {
    id: "51",
    name: "Shrimp Scampi",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Seafood-Free"],
  },
  {
    id: "52",
    name: "Salmon Piccata",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Entrees",
    allergies: ["Seafood-Free"],
  },
  
  // Desserts
  {
    id: "53",
    name: "Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Desserts",
    allergies: ["Vegetarian"],
  },
  {
    id: "54",
    name: "Cannoli",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Desserts",
    allergies: ["Vegetarian"],
  },
  {
    id: "55",
    name: "Cheesecake",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Desserts",
    allergies: ["Vegetarian"],
  },
  {
    id: "56",
    name: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Desserts",
    allergies: ["Vegetarian"],
  },
  
  // Drinks
  {
    id: "57",
    name: "Soda",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Drinks",
    allergies: ["Gluten-Free", "Vegan", "Vegetarian", "Nut-Free"],
  },
  {
    id: "58",
    name: "Water",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Drinks",
    allergies: ["Gluten-Free", "Vegan", "Vegetarian", "Nut-Free"],
  },
  {
    id: "59",
    name: "Juice",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Drinks",
    allergies: ["Gluten-Free", "Vegan", "Vegetarian", "Nut-Free"],
  },
  {
    id: "60",
    name: "Espresso",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Drinks",
    allergies: ["Gluten-Free", "Vegan", "Vegetarian", "Nut-Free"],
  },
  {
    id: "61",
    name: "Cappuccino",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085/?w=400&h=300&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3",
    category: "Drinks",
    allergies: ["Vegetarian"],
  },
];

export function MenuScreen({
  onSelectItem,
  cartCount,
  cartTotal,
  onViewCart,
}: MenuScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  // Toggle allergy filter
  const toggleAllergyFilter = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  // Filter menu items based on selected category and allergies
  const filteredMenuItems = menuItems.filter(item => {
    const categoryMatch = item.category === selectedCategory;
    const allergyMatch = selectedAllergies.length === 0 || 
      selectedAllergies.some(allergy => item.allergies.includes(allergy));
    return categoryMatch && allergyMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white pb-24"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-4 sm:pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* MenuPro Logo */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <img 
              src="/menupro-logo.svg" 
              alt="MenuPro Logo" 
              className="h-8 sm:h-10 w-auto"
            />
          </div>
          
          <h1 className="text-center mb-2 text-[#1C1C1E] text-lg sm:text-xl font-semibold">
            O Sole Mio Cucina 🍝
          </h1>
          <p className="text-center text-[#1C1C1E]/70 mb-6 text-sm sm:text-base">
            Authentic Italian cuisine — fresh pasta, wood-fired pizza, and traditional dishes!
          </p>

          {/* Desktop Layout: Side by side filters and categories */}
          <div className="lg:flex lg:items-start lg:gap-8">
            {/* Allergy Filters */}
            <div className="space-y-3 lg:flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-[#1C1C1E]">Filter by Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map((allergy) => (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergyFilter(allergy)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${
                      selectedAllergies.includes(allergy)
                        ? "bg-red-100 text-red-700 border-2 border-red-200"
                        : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-red-300"
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Tabs - Desktop */}
            <div className="hidden lg:block lg:flex-1">
              <h3 className="text-sm font-medium text-[#1C1C1E] mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={
                        selectedCategory === category
                          ? "bg-[#F97316] text-white hover:bg-[#F97316]/90 px-4 py-2 rounded-full cursor-pointer transition-all text-sm font-medium"
                          : "bg-white text-[#1C1C1E] border-gray-200 px-4 py-2 rounded-full cursor-pointer hover:border-[#F97316] transition-all text-sm font-medium"
                      }
                    >
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs - Mobile/Tablet Only */}
      <div className="lg:hidden overflow-x-auto px-4 py-3 sm:py-4 no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#F97316] text-white hover:bg-[#F97316]/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer transition-all text-xs sm:text-sm font-medium"
                    : "bg-white text-[#1C1C1E] border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer hover:border-[#F97316] transition-all text-xs sm:text-sm font-medium"
                }
              >
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {filteredMenuItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${selectedCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectItem(item)}
            className="bg-[#1C1C1E] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Circular Image */}
            <div className="aspect-square p-4 sm:p-6 lg:p-4">
              <div className="w-full h-full rounded-full overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card Content */}
            <div className="px-4 pb-4 sm:px-6 lg:px-4">
              <h3 className="text-white mb-3 text-sm sm:text-base lg:text-sm font-medium text-center">{item.name}</h3>
              <Button className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full h-9 sm:h-10 lg:h-9 text-sm font-medium transition-all duration-200">
                View &gt;
              </Button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-20"
        >
          <Button
            onClick={onViewCart}
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full h-16 px-6 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="mr-2">{cartCount}</span>
            <span>${cartTotal.toFixed(2)}</span>
          </Button>
        </motion.div>
      )}

    </motion.div>
  );
}