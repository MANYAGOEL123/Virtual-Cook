"use client"

import { Heart, MessageCircle, Clock, Star } from "lucide-react"

export default function RecipeCard({ recipe, onClick }) {
  const BACKEND_API=process.env.NEXT_PUBLIC_BACKEND_CALL;
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "text-gray-500 bg-gray-100"

    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={recipe.imageUrl || "/placeholder.svg"} // ✅ fixed: use correct field
          alt={recipe.title || "Recipe"}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        {recipe.difficulty && (
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title || "Untitled Recipe"}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description || "No description available."}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{recipe.averageRating ?? "N/A"}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{recipe.cookingTime ? `${recipe.cookingTime} mins` : "N/A"}</span>
          </div>
        </div>
        

        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{recipe.totalLikes ?? 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{recipe.comments?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
