"use client"

import { useState } from "react"
import { Brain, Plus, X, Search } from "lucide-react"

export default function AIAssistant({ onRecipeSelect, onNavigate }) {
  const [ingredients, setIngredients] = useState([])
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [suggestedRecipes, setSuggestedRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const findRecipes = async () => {
    if (ingredients.length === 0) return

    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const mockRecipes = [
        {
          id: 1,
          name: "Quick Vegetable Stir Fry",
          description: "A healthy and quick stir fry using your available vegetables",
          image: "/placeholder.svg?height=200&width=300",
          matchPercentage: 95,
          missingIngredients: ["soy sauce", "garlic"],
          cookTime: "15 min",
        },
        {
          id: 2,
          name: "Creamy Pasta Primavera",
          description: "Delicious pasta with fresh vegetables and cream sauce",
          image: "/placeholder.svg?height=200&width=300",
          matchPercentage: 80,
          missingIngredients: ["heavy cream", "parmesan cheese"],
          cookTime: "25 min",
        },
        {
          id: 3,
          name: "Garden Salad Bowl",
          description: "Fresh and healthy salad with your available ingredients",
          image: "/placeholder.svg?height=200&width=300",
          matchPercentage: 90,
          missingIngredients: ["olive oil", "lemon"],
          cookTime: "10 min",
        },
      ]

      setSuggestedRecipes(mockRecipes)
      setIsLoading(false)
    }, 2000)
  }

  const handleRecipeClick = (recipe) => {
    onRecipeSelect(recipe)
    onNavigate("recipe-detail")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Cooking Assistant</h1>
        <p className="text-xl text-gray-600">Tell us what ingredients you have, and we'll suggest perfect recipes</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Ingredients Input */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Brain className="h-6 w-6 text-[#FF6B6B] mr-2" />
            Your Ingredients
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                placeholder="Add an ingredient..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
              />
              <button
                onClick={addIngredient}
                className="px-4 py-3 bg-[#4ECDC4] text-white rounded-xl hover:bg-[#4ECDC4]/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {ingredients.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Added Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-[#F7FFF7] text-gray-700 rounded-full text-sm"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={findRecipes}
              disabled={ingredients.length === 0 || isLoading}
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Finding Recipes...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Find Recipes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recipe Suggestions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recipe Suggestions</h2>

          {suggestedRecipes.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Add some ingredients to get recipe suggestions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex space-x-4">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                        <span className="text-sm font-medium text-[#4ECDC4]">{recipe.matchPercentage}% match</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Cook time: {recipe.cookTime}</span>
                        <span>Missing: {recipe.missingIngredients.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
