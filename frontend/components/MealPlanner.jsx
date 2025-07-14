"use client"

import { useState } from "react"
import { Users, Calendar, ShoppingCart } from "lucide-react"

export default function MealPlanner() {
  const [householdSize, setHouseholdSize] = useState("")
  const [mealPlan, setMealPlan] = useState(null)

  const generateMealPlan = (e) => {
    e.preventDefault()
    const size = Number.parseInt(householdSize)

    const weeklyMeals = [
      {
        day: "Monday",
        breakfast: { meal: "Pancakes with syrup", servings: size },
        lunch: { meal: "Chicken Caesar wraps", servings: size },
        dinner: { meal: "Spaghetti Bolognese", servings: size },
      },
      {
        day: "Tuesday",
        breakfast: { meal: "Scrambled eggs and toast", servings: size },
        lunch: { meal: "Vegetable soup with bread", servings: size },
        dinner: { meal: "Grilled salmon with rice", servings: size },
      },
      {
        day: "Wednesday",
        breakfast: { meal: "Oatmeal with fruit", servings: size },
        lunch: { meal: "Turkey sandwiches", servings: size },
        dinner: { meal: "Chicken stir-fry", servings: size },
      },
      {
        day: "Thursday",
        breakfast: { meal: "French toast", servings: size },
        lunch: { meal: "Quinoa salad bowl", servings: size },
        dinner: { meal: "Beef tacos", servings: size },
      },
      {
        day: "Friday",
        breakfast: { meal: "Smoothie bowls", servings: size },
        lunch: { meal: "Grilled chicken salad", servings: size },
        dinner: { meal: "Pizza night", servings: size },
      },
      {
        day: "Saturday",
        breakfast: { meal: "Waffles with berries", servings: size },
        lunch: { meal: "Burgers and fries", servings: size },
        dinner: { meal: "Roast chicken dinner", servings: size },
      },
      {
        day: "Sunday",
        breakfast: { meal: "Eggs Benedict", servings: size },
        lunch: { meal: "Sunday roast leftovers", servings: size },
        dinner: { meal: "Pasta primavera", servings: size },
      },
    ]

    const groceryList = [
      "Eggs (2 dozen)",
      "Bread (2 loaves)",
      "Chicken breast (2 lbs)",
      "Ground beef (1 lb)",
      "Salmon fillets (1 lb)",
      "Pasta (2 boxes)",
      "Rice (1 bag)",
      "Mixed vegetables (frozen)",
      "Lettuce (2 heads)",
      "Tomatoes (6)",
      "Onions (3)",
      "Milk (1 gallon)",
      "Cheese (assorted)",
      "Fruits (bananas, apples, berries)",
      "Cooking oil",
      "Seasonings and spices",
    ]

    setMealPlan({
      householdSize: size,
      weeklyMeals,
      groceryList,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Family Meal Planner</h1>
        <p className="text-xl text-gray-600">Plan weekly meals for your entire household</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="h-6 w-6 text-[#FF6B6B] mr-2" />
            Household Info
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

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg"
            >
              Generate Meal Plan
            </button>
          </form>

          {mealPlan && (
            <div className="mt-8 p-4 bg-[#F7FFF7] rounded-xl">
              <h3 className="font-bold text-lg mb-2">Plan Summary</h3>
              <p className="text-gray-600">
                Weekly meal plan for{" "}
                <span className="font-semibold text-[#FF6B6B]">{mealPlan.householdSize} people</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">21 meals planned • Grocery list included</p>
            </div>
          )}
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

              <div className="grid md:grid-cols-2 gap-4">
                {mealPlan.groceryList.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-[#F7FFF7] rounded-lg">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

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
