"use client"

import { ChefHat, Star, Users, Clock } from "lucide-react"

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FFF7] to-[#4ECDC4]/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-8">
              <ChefHat className="h-16 w-16 text-[#FF6B6B]" />
              <h1 className="text-6xl font-bold text-gray-800">Virtual Cook</h1>
            </div>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Your personal cooking companion. Discover recipes, plan meals, and get AI-powered cooking assistance all
              in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("login")}
                className="px-8 py-4 bg-[#FF6B6B] text-white rounded-full text-lg font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="px-8 py-4 bg-[#4ECDC4] text-white rounded-full text-lg font-semibold hover:bg-[#4ECDC4]/90 transition-colors shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Everything You Need for Perfect Cooking
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#F7FFF7] shadow-lg">
              <Star className="h-12 w-12 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Recipe Gallery</h3>
              <p className="text-gray-600">
                Browse thousands of recipes with detailed instructions, videos, and ratings from our community.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#F7FFF7] shadow-lg">
              <Users className="h-12 w-12 text-[#4ECDC4] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Smart Planning</h3>
              <p className="text-gray-600">
                Get personalized diet and meal plans based on your preferences and household size.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#F7FFF7] shadow-lg">
              <Clock className="h-12 w-12 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
              <p className="text-gray-600">
                Tell us what ingredients you have, and our AI will suggest perfect recipes for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
