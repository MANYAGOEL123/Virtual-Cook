"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageCircle, Star, Clock, Users, ChefHat } from "lucide-react"

export default function RecipeDetail({ recipe, onBack }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah M.", text: "Amazing recipe! My family loved it.", rating: 5 },
    { id: 2, user: "John D.", text: "Easy to follow instructions. Will make again!", rating: 4 },
  ])

  const ingredients = [
    "2 cups Arborio rice",
    "6 cups warm chicken broth",
    "1 lb mixed mushrooms, sliced",
    "1 medium onion, diced",
    "3 cloves garlic, minced",
    "1/2 cup white wine",
    "1/2 cup grated Parmesan cheese",
    "2 tbsp butter",
    "2 tbsp olive oil",
    "Salt and pepper to taste",
    "Fresh parsley for garnish",
  ]

  const instructions = [
    "Heat olive oil in a large pan over medium heat. Add mushrooms and cook until golden.",
    "In a separate pot, heat the chicken broth and keep it warm.",
    "Add onion to the mushroom pan and cook until translucent.",
    "Add garlic and rice, stirring for 2 minutes until rice is lightly toasted.",
    "Pour in white wine and stir until absorbed.",
    "Add warm broth one ladle at a time, stirring constantly until absorbed.",
    "Continue until rice is creamy and tender, about 18-20 minutes.",
    "Stir in butter and Parmesan cheese. Season with salt and pepper.",
    "Garnish with fresh parsley and serve immediately.",
  ]

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim() && rating > 0) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "You",
          text: comment,
          rating: rating,
        },
      ])
      setComment("")
      setRating(0)
    }
  }

  if (!recipe) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button onClick={onBack} className="flex items-center space-x-2 text-[#FF6B6B] hover:text-[#FF6B6B]/80 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Recipes</span>
      </button>

      {/* Recipe Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">{recipe.cookTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">4 servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">{recipe.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-medium">{recipe.rating}/5</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart className="h-5 w-5" />
              <span>{recipe.likes} likes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle className="h-5 w-5" />
              <span>{recipe.comments} comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorial */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Tutorial</h2>
        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-gray-600">Click to play video tutorial</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#4ECDC4] rounded-full"></div>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
          <ol className="space-y-4">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FF6B6B] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments & Reviews</h2>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-[#F7FFF7] rounded-xl">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`h-6 w-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  <Star className="h-full w-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this recipe..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none resize-none"
            rows="3"
          />
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF6B6B]/90 transition-colors"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{comment.user}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(comment.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
