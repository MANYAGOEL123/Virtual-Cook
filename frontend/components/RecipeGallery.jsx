"use client"
import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RecipeGallery({ onRecipeSelect}) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [recipes, setRecipes] = useState([]) // ✅ you missed this
  const [loading, setLoading] = useState(true)

  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_CALL || "http://localhost:5000"

  useEffect(() => {
    fetch(`${BACKEND_API}/api/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err)
        setLoading(false)
      })
  }, [])
   console.log(recipes);
  const categories = ["all", "appetizers", "main course", "desserts", "beverages"]

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRecipeClick = (recipe) => {
  router.push(`/recipes/${recipe._id}`)
}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Gallery</h1>
        <p className="text-xl text-gray-600">Discover delicious recipes from around the world</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#FF6B6B] text-white"
                  : "bg-white text-gray-600 hover:bg-[#4ECDC4]/20"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading recipes...</p>}

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
        ))}
      </div>
    </div>
  )
}
