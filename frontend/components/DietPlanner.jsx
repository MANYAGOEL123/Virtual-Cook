"use client"

import { useState } from "react"
import { Calculator, Target } from "lucide-react"

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    targetWeight: "",
    age: "",
    gender: "male",
    activityLevel: "moderate",
  })
  const [dietPlan, setDietPlan] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const calculateDietPlan = (e) => {
    e.preventDefault()

    // Simple BMR calculation (Mifflin-St Jeor Equation)
    const weight = Number.parseFloat(formData.weight)
    const height = Number.parseFloat(formData.height)
    const age = Number.parseFloat(formData.age)

    let bmr
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }

    const dailyCalories = Math.round(bmr * activityMultipliers[formData.activityLevel])
    const targetCalories = dailyCalories - 500 // 500 calorie deficit for weight loss

    const weeklyPlan = [
      {
        day: "Monday",
        breakfast: { meal: "Oatmeal with berries", calories: 300 },
        lunch: { meal: "Grilled chicken salad", calories: 400 },
        dinner: { meal: "Baked salmon with vegetables", calories: 450 },
        snack: { meal: "Greek yogurt", calories: 150 },
      },
      {
        day: "Tuesday",
        breakfast: { meal: "Scrambled eggs with toast", calories: 320 },
        lunch: { meal: "Quinoa bowl with vegetables", calories: 380 },
        dinner: { meal: "Lean beef with sweet potato", calories: 480 },
        snack: { meal: "Apple with almonds", calories: 120 },
      },
      {
        day: "Wednesday",
        breakfast: { meal: "Smoothie bowl", calories: 280 },
        lunch: { meal: "Turkey wrap", calories: 420 },
        dinner: { meal: "Grilled fish with rice", calories: 440 },
        snack: { meal: "Carrot sticks with hummus", calories: 160 },
      },
      {
        day: "Thursday",
        breakfast: { meal: "Avocado toast", calories: 310 },
        lunch: { meal: "Lentil soup with bread", calories: 390 },
        dinner: { meal: "Chicken stir-fry", calories: 460 },
        snack: { meal: "Mixed nuts", calories: 140 },
      },
      {
        day: "Friday",
        breakfast: { meal: "Greek yogurt parfait", calories: 290 },
        lunch: { meal: "Tuna salad sandwich", calories: 410 },
        dinner: { meal: "Vegetable curry with rice", calories: 430 },
        snack: { meal: "Banana with peanut butter", calories: 170 },
      },
      {
        day: "Saturday",
        breakfast: { meal: "Pancakes with fruit", calories: 340 },
        lunch: { meal: "Grilled vegetable wrap", calories: 360 },
        dinner: { meal: "Pasta with marinara sauce", calories: 470 },
        snack: { meal: "Trail mix", calories: 130 },
      },
      {
        day: "Sunday",
        breakfast: { meal: "French toast", calories: 330 },
        lunch: { meal: "Caesar salad with chicken", calories: 400 },
        dinner: { meal: "Roasted chicken with potatoes", calories: 490 },
        snack: { meal: "Dark chocolate", calories: 80 },
      },
    ]

    setDietPlan({
      dailyCalories: targetCalories,
      weeklyPlan,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Personal Diet Planner</h1>
        <p className="text-xl text-gray-600">Get a customized diet plan based on your goals</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calculator className="h-6 w-6 text-[#FF6B6B] mr-2" />
            Your Information
          </h2>

          <form onSubmit={calculateDietPlan} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="170"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (kg)</label>
                <input
                  type="number"
                  name="targetWeight"
                  value={formData.targetWeight}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="65"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                <option value="active">Active (hard exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (very hard exercise, physical job)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg"
            >
              Generate Diet Plan
            </button>
          </form>
        </div>

        {/* Diet Plan Results */}
        {dietPlan && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="h-6 w-6 text-[#4ECDC4] mr-2" />
              Your Weekly Diet Plan
            </h2>

            <div className="mb-6 p-4 bg-[#F7FFF7] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Daily Calorie Target:</span>
                <span className="text-2xl font-bold text-[#FF6B6B]">{dietPlan.dailyCalories} cal</span>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {dietPlan.weeklyPlan.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{day.day}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Breakfast:</span>
                      <div className="text-right">
                        <div className="text-sm">{day.breakfast.meal}</div>
                        <div className="text-xs text-gray-500">{day.breakfast.calories} cal</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lunch:</span>
                      <div className="text-right">
                        <div className="text-sm">{day.lunch.meal}</div>
                        <div className="text-xs text-gray-500">{day.lunch.calories} cal</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dinner:</span>
                      <div className="text-right">
                        <div className="text-sm">{day.dinner.meal}</div>
                        <div className="text-xs text-gray-500">{day.dinner.calories} cal</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Snack:</span>
                      <div className="text-right">
                        <div className="text-sm">{day.snack.meal}</div>
                        <div className="text-xs text-gray-500">{day.snack.calories} cal</div>
                      </div>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-[#FF6B6B]">
                          {day.breakfast.calories + day.lunch.calories + day.dinner.calories + day.snack.calories} cal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
