"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Heart, MessageCircle, Star, Clock, Users, ChefHat } from "lucide-react"

export default function RecipeDetail({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}`)
        if (!res.ok) throw new Error("Failed to fetch recipe.")
        const data = await res.json()
        setRecipe(data)
        setComments(data.comments || [])  // assuming comments come from backend
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (recipeId) fetchRecipe()
  }, [recipeId])

  const handleCommentSubmit = async (e) => {
  e.preventDefault()

  if (!comment.trim() || rating === 0) return

  const token = localStorage.getItem("token") // assumes JWT is stored in localStorage

  try {
    const response = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔐 required by your `protect` middleware
      },
      body: JSON.stringify({
        entityType: "recipe",
        entityId: recipeId,
        text: comment,
        rating,
      }),
    })

    if (!response.ok) throw new Error("Failed to post comment")

    const newComment = await response.json()

    // Add new comment to UI
    setComments([
      ...comments,
      {
        id: newComment._id,
        user: "You", // replace with actual user name if available
        text: newComment.text,
        rating: newComment.rating,
      },
    ])

    setComment("")
    setRating(0)
  } catch (err) {
    console.error(err)
    alert("Failed to post comment. Please try again.")
  }
}


  if (loading) return <p className="text-center py-8">Loading...</p>
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>
  if (!recipe) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-[#FF6B6B] hover:text-[#FF6B6B]/80 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Recipes</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <img src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">{recipe.cookingTime + recipe.prepTime} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">{recipe.servings || 4} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-[#4ECDC4]" />
              <span className="font-medium">{recipe.difficulty || "Medium"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-medium">{recipe.averageRating || 0}/5</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart className="h-5 w-5" />
              <span>{recipe.totalLikes} likes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorial Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Tutorial</h2>
        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-600">Video coming soon...</p>
        </div>
      </div>

      {/* Ingredients */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#4ECDC4] rounded-full"></div>
                <span className="text-gray-700">
                  {ingredient.quantity} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
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

        {/* Add Comment */}
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