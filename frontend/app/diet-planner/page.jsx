"use client"
import DietPlanner from "@/components/DietPlanner.jsx"
import Navigation from "@/components/Navigation.jsx"
import { useRouter } from "next/navigation"

export default function DietPlannerPage() {
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
        currentPage="diet-planner"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <DietPlanner />
    </>
  )
}
