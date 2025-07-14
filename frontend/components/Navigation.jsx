"use client"

import { ChefHat, Home, Calendar, Brain, Video, LogOut, User } from "lucide-react"

export default function Navigation({ currentPage, onNavigate, onLogout }) {
  const navItems = [
    { id: "recipes", label: "Recipes", icon: Home },
    { id: "diet-planner", label: "Diet Plan", icon: User },
    { id: "meal-planner", label: "Meal Plan", icon: Calendar },
    { id: "ai-assistant", label: "AI Assistant", icon: Brain },
    { id: "video-sharing", label: "Videos", icon: Video },
  ]

  return (
    <nav className="bg-white shadow-lg border-b-2 border-[#4ECDC4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-[#FF6B6B]" />
            <span className="text-2xl font-bold text-gray-800">Virtual Cook</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "bg-[#FF6B6B] text-white"
                      : "text-gray-600 hover:bg-[#4ECDC4]/20 hover:text-[#4ECDC4]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
