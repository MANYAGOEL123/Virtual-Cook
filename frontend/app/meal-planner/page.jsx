"use client"
import MealPlanner from "@/components/MealPlanner.jsx"
import Navigation from "@/components/Navigation.jsx"
import { useRouter } from "next/navigation"

export default function MealPlannerPage() {
  const router = useRouter()

  // Navigation handler
  const handleNavigate = (page) => {
    router.push(`/${page}`)
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/") // Redirect to landing page
  }

  return (
    <>
      <Navigation
        currentPage="meal-planner"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <MealPlanner />
    </>
  )
}
