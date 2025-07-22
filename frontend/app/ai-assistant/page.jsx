"use client"
import AIAssistant from "@/components/AIAssistant.jsx"
import Navigation from "@/components/Navigation.jsx"
import { useRouter } from "next/navigation"

export default function AIAssistantPage() {
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
        currentPage="ai-assistant"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <AIAssistant />
    </>
  )
}
