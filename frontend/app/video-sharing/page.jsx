"use client"
import VideoSharing from "@/components/VideoSharing.jsx"
import Navigation from "@/components/Navigation.jsx"
import { useRouter } from "next/navigation"

export default function VideoSharingPage() {
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
        currentPage="video-sharing"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <VideoSharing />
    </>
  )
}
