"use client"

import { useState } from "react"
import { Brain, Plus, X, Search } from "lucide-react"

export default function AIAssistant() {
  const [ingredient, setIngredient] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [suggestedRecipe, setSuggestedRecipe] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()])
      setIngredient("")
    }
  }

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(index, 1)
    setIngredients(updatedIngredients)
  }

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      })
      const data = await response.json()
      setSuggestedRecipe(data.recipe || "No recipe found.")
    } catch (error) {
      setSuggestedRecipe("Error generating recipe.")
    }
    setIsLoading(false)
  }

  const handleChatMessage = async (e) => {
    if (e.key === "Enter") {
      const message = e.target.value.trim()
      if (!message) return

      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "user1",
            message: message,
          }),
        })
        const data = await response.json()
        setSuggestedRecipe(data.response || "No response.")
      } catch (err) {
        setSuggestedRecipe("Error talking to assistant.")
      }
      e.target.value = ""
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-600" />
        Virtual Cook Assistant
      </h1>

      {/* Ingredient Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter an ingredient"
          className="flex-1 px-4 py-2 border rounded-xl"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button
          onClick={handleAddIngredient}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Ingredients */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map((ing, index) => (
          <span
            key={index}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
          >
            {ing}
            <button onClick={() => handleRemoveIngredient(index)}>
              <X className="w-4 h-4 ml-2 text-red-500 hover:text-red-700" />
            </button>
          </span>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateRecipe}
        disabled={isLoading}
        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 w-full mb-6"
      >
        <Search className="inline w-4 h-4 mr-2" />
        {isLoading ? "Generating..." : "Suggest Recipe"}
      </button>

      {/* Chat Input */}
      <div className="mb-4">
        <h3 className="text-gray-700 font-medium mb-1">Ask the Assistant</h3>
        <input
          type="text"
          placeholder='Try saying "hello" or "who are you?"'
          className="w-full px-4 py-2 border rounded-xl"
          onKeyDown={handleChatMessage}
        />
      </div>

      {/* Output Section */}
      {suggestedRecipe && (
        <div className="bg-gray-100 p-4 rounded-xl whitespace-pre-wrap">
          <strong>Assistant says:</strong>
          <p>{suggestedRecipe}</p>
        </div>
      )}
    </div>
  )
}
