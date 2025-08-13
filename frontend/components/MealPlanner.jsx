"use client"

import { useState } from "react"
import { Users, Calendar, ShoppingCart } from "lucide-react"

const DIETS = ["None", "Vegetarian", "Vegan", "Keto", "Gluten-free"]
const CUISINES = ["Mixed", "Indian", "Italian", "Asian", "Mexican", "Mediterranean"]
const BUDGETS = ["Low", "Medium", "High"]
const TIMES = ["Quick (≤ 20 min)", "Standard (20–45 min)", "Flexible (any)"]
const ALLERGENS = ["Dairy", "Eggs", "Gluten", "Nuts", "Shellfish", "Soy"]
const HEALTH_GOALS = ["Balanced diet", "Weight loss", "Muscle gain", "Diabetes-friendly", "Heart-healthy"]
const VARIETY = ["High variety (no repeats)", "Smart reuse (reduce waste)"]

export default function MealPlanner() {
  const [householdSize, setHouseholdSize] = useState("")
  const [dietaryPreference, setDietaryPreference] = useState("None")
  const [cuisinePreference, setCuisinePreference] = useState("Mixed")
  const [budgetLevel, setBudgetLevel] = useState("Medium")
  const [cookingTime, setCookingTime] = useState("Standard (20–45 min)")
  const [allergies, setAllergies] = useState([])
  const [healthGoal, setHealthGoal] = useState("Balanced diet")
  const [varietyPreference, setVarietyPreference] = useState("High variety (no repeats)")
  const [reuseIngredients, setReuseIngredients] = useState(true)

  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const toggleAllergy = (a) => {
    setAllergies((prev) => (prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]))
  }

  const generateMealPlan = async (e) => {
    e.preventDefault();
    setError("");
    setMealPlan(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/generate-mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          household_size: Number(householdSize),
          dietary_preference: dietaryPreference,
          cuisine_preference: cuisinePreference,
          budget_level: budgetLevel,
          cooking_time: cookingTime,
          allergies,
          health_goal: healthGoal,
          variety_preference: varietyPreference,
          reuse_ingredients: reuseIngredients
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || "Failed to generate meal plan");
      }
      if (data.error) {
        console.error("AI returned invalid JSON:", data.raw);
        throw new Error("AI output was not valid JSON. Check server logs.");
      }

      setMealPlan({
        householdSize: Number(householdSize),
        weeklyMeals: data.weeklyMeals,
        groceryList: data.groceryList, // object with categories (fallback array supported below)
        meta: data.meta || {}
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderGrocery = (groceryList) => {
    // Supports both categorized object and simple array
    if (Array.isArray(groceryList)) {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {groceryList.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-[#F7FFF7] rounded-lg">
              <input type="checkbox" className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      )
    }
    // Categorized object
    const categories = Object.keys(groceryList);
    return (
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-semibold text-gray-800 mb-3">{cat}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groceryList[cat].map((item, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 bg-[#F7FFF7] rounded-lg cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded" />
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Family Meal Planner</h1>
        <p className="text-xl text-gray-600">Plan weekly meals tailored to your household and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="h-6 w-6 text-[#FF6B6B] mr-2" />
            Household & Preferences
          </h2>

          <form onSubmit={generateMealPlan} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
              <input
                type="number"
                value={householdSize}
                onChange={(e) => setHouseholdSize(e.target.value)}
                required
                min="1"
                max="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                placeholder="4"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Level</label>
                <select
                  value={budgetLevel}
                  onChange={(e) => setBudgetLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time</label>
                <select
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Goal</label>
                <select
                  value={healthGoal}
                  onChange={(e) => setHealthGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {HEALTH_GOALS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variety Preference</label>
                <select
                  value={varietyPreference}
                  onChange={(e) => setVarietyPreference(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                >
                  {VARIETY.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reuseIngredients}
                onChange={(e) => setReuseIngredients(e.target.checked)}
                className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Prioritize reusing ingredients to reduce cost/waste</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Meal Plan"}
            </button>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            {mealPlan && (
              <div className="mt-8 p-4 bg-[#F7FFF7] rounded-xl">
                <h3 className="font-bold text-lg mb-2">Plan Summary</h3>
                <p className="text-gray-600">
                  Weekly meal plan for{" "}
                  <span className="font-semibold text-[#FF6B6B]">{mealPlan.householdSize} people</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">21 meals planned • Categorized grocery list included</p>
              </div>
            )}
          </form>
        </div>

        {/* Weekly Meal Plan */}
        {mealPlan && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-[#4ECDC4] mr-2" />
                Weekly Meal Plan
              </h2>

              <div className="space-y-4">
                {mealPlan.weeklyMeals.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">{day.day}</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Breakfast</h4>
                        <p className="text-sm text-gray-700">{day.breakfast.meal}</p>
                        <p className="text-xs text-gray-500 mt-1">Serves {day.breakfast.servings}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Lunch</h4>
                        <p className="text-sm text-gray-700">{day.lunch.meal}</p>
                        <p className="text-xs text-gray-500 mt-1">Serves {day.lunch.servings}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Dinner</h4>
                        <p className="text-sm text-gray-700">{day.dinner.meal}</p>
                        <p className="text-xs text-gray-500 mt-1">Serves {day.dinner.servings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grocery List */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingCart className="h-6 w-6 text-[#4ECDC4] mr-2" />
                Grocery List
              </h2>

              {renderGrocery(mealPlan.groceryList)}

              <div className="mt-6 p-4 bg-[#4ECDC4]/10 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> Check your pantry before shopping and adjust quantities based on what you
                  already have.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}