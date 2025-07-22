"use client"
import RecipeDetail from "@/components/RecipeDetail"
import Navigation from "@/components/Navigation"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RecipeDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const handleNavigate = (page) => {
    router.push(`/${page}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    if (!id) router.push("/recipes") // fallback
  }, [id])

  return (
    <>
      <Navigation
        currentPage="recipes"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <RecipeDetail recipeId={id} onBack={handleBack} />
    </>
  )
}
