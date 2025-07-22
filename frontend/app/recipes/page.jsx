"use client"
import RecipeGallery from "@/components/RecipeGallery"
import Navigation from "@/components/Navigation"
import { useRouter } from "next/navigation"

export default function RecipeGalleryPage() {
  const router = useRouter()

  const handleNavigate = (page) => {
    router.push(`/${page}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <>
      <Navigation
        currentPage="recipes"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <RecipeGallery />
    </>
  )
}
