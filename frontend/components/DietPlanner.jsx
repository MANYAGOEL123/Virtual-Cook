"use client"

import { useState } from "react"
import { Calculator, Target } from "lucide-react"

const DIETS = ["Any", "Vegetarian", "Vegan", "Keto", "Gluten-free"]
const CUISINES = ["Any", "Indian", "Italian", "Asian", "Mexican", "Mediterranean"]
const ALLERGENS = ["Dairy", "Eggs", "Gluten", "Nuts", "Shellfish", "Soy"]
const COOK_TIMES = ["Any", "Quick (≤ 20 min)", "Standard (20–45 min)", "Flexible"]
const BUDGETS = ["Any", "Low", "Medium", "High"]

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    targetWeight: "",
    age: "",
    gender: "male",
    activityLevel: "moderate",
  })

  const [dietaryPreference, setDietaryPreference] = useState("Any")
  const [cuisinePreference, setCuisinePreference] = useState("Any")
  const [allergies, setAllergies] = useState([])
  const [cookingTime, setCookingTime] = useState("Any")
  const [budgetLevel, setBudgetLevel] = useState("Any")

  const [dietPlan, setDietPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleAllergy = (a) => {
    setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const calculateDietPlan = async (e) => {
    e.preventDefault()
    setError("")
    setDietPlan(null)
    setLoading(true)

    try {
      // build request in snake_case for backend
      const body = {
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        target_weight: parseFloat(formData.targetWeight),
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        activity_level: formData.activityLevel,
        dietary_preference: dietaryPreference,
        cuisine_preference: cuisinePreference,
        allergies,
        cooking_time: cookingTime,
        budget_level: budgetLevel
      }

      const res = await fetch("http://localhost:8000/generate-dietplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.detail || "Failed to generate diet plan")
      }
      if (data.error) {
        console.error("AI returned invalid JSON:", data.raw)
        throw new Error("AI output was not valid JSON. Check server logs.")
      }

      setDietPlan({
        dailyCalories: data.dailyCalories,
        weeklyPlan: data.weeklyPlan,
        groceryList: data.groceryList,
        meta: data.meta || {}
      })
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const dailyTotal = (day) =>
    (day.breakfast.calories || 0) +
    (day.lunch.calories || 0) +
    (day.dinner.calories || 0) +
    (day.snack.calories || 0)

  const renderGrocery = (groceryList) => {
    if (!groceryList) return null
    if (Array.isArray(groceryList)) {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {groceryList.map((item, idx) => (
            <label key={idx} className="flex items-center space-x-3 p-3 bg-[#F7FFF7] rounded-lg cursor-pointer">
              <input type="checkbox" className="h-4 w-4 text-[#FF6B6B] border-gray-300 rounded" />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )
    }
    const categories = Object.keys(groceryList)
    return (
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-semibold text-gray-800 mb-3">{cat}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groceryList[cat].map((item, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 bg-[#F7FFF7] rounded-lg cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6B6B] border-gray-300 rounded" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Personal Diet Planner</h1>
        <p className="text-xl text-gray-600">Get a customised AI diet plan based on your goals</p>
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
                  min="20"
                  max="400"
                  step="0.1"
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
                  min="100"
                  max="250"
                  step="0.1"
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
                  min="20"
                  max="400"
                  step="0.1"
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
                  min="11"
                  max="99"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  <option value="light">Light (1–3 days/week)</option>
                  <option value="moderate">Moderate (3–5 days/week)</option>
                  <option value="active">Active (6–7 days/week)</option>
                  <option value="very_active">Very Active (physical job)</option>
                </select>
              </div>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {DIETS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Preference</label>
                <select
                  value={cuisinePreference}
                  onChange={(e) => setCuisinePreference(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <div className="flex flex-wrap gap-2">
                {ALLERGENS.map(a => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAllergy(a)}
                    className={`px-3 py-2 rounded-full border ${allergies.includes(a) ? 'bg-[#FF6B6B] text-white border-transparent' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time</label>
                <select
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {COOK_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <select
                  value={budgetLevel}
                  onChange={(e) => setBudgetLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </button>

            {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm mt-3">{error}</div>}
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
              {dietPlan.meta?.notes && (
                <p className="text-sm text-gray-600 mt-2">{dietPlan.meta.notes}</p>
              )}
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
                        <span className="text-[#FF6B6B]">{dailyTotal(day)} cal</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grocery List */}
            {dietPlan.groceryList && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Grocery List</h3>
                {renderGrocery(dietPlan.groceryList)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}