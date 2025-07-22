"use client"
import LandingPage from "@/components/LandingPage.jsx"

export default function Login(){
  return <LandingPage />
}

// "use client"

// import { useState } from "react"
// import LandingPage from "@/components/LandingPage"
// import LoginPage from "../app/login/page.jsx"
// import SignupPage from "@/components/SignupPage"
// import RecipeGallery from "@/components/RecipeGallery"
// import RecipeDetail from "@/components/RecipeDetail"
// import DietPlanner from "@/components/DietPlanner"
// import MealPlanner from "@/components/MealPlanner"
// import AIAssistant from "@/components/AIAssistant"
// import VideoSharing from "@/components/VideoSharing"
// import VideoPlayer from "@/components/VideoPlayer"
// import Navigation from "@/components/Navigation"

// export default function App() {
//   const BACKEND_API=process.env.BACKEND_CALL;
//   const [currentPage, setCurrentPage] = useState("landing")
//   const [selectedRecipe, setSelectedRecipe] = useState(null)
//   const [selectedVideo, setSelectedVideo] = useState(null)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   const handleLogin = () => {
//     setIsAuthenticated(true)
//     setCurrentPage("recipes")
//   }

//   const handleLogout = () => {
//     setIsAuthenticated(false)
//     setCurrentPage("landing")
//   }

//   const renderPage = () => {
//     if (!isAuthenticated && !["landing", "login", "signup"].includes(currentPage)) {
//       return <LandingPage onNavigate={setCurrentPage} />
//     }

//     switch (currentPage) {
//       case "landing":
//         return <LandingPage onNavigate={setCurrentPage} />
//       case "login":
//         return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />
//       case "signup":
//         return <SignupPage onNavigate={setCurrentPage} onLogin={handleLogin} />
//       case "recipes":
//         return <RecipeGallery onRecipeSelect={setSelectedRecipe} onNavigate={setCurrentPage} />
//       case "recipe-detail":
//         return <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentPage("recipes")} />
//       case "diet-planner":
//         return <DietPlanner />
//       case "meal-planner":
//         return <MealPlanner />
//       case "ai-assistant":
//         return <AIAssistant onRecipeSelect={setSelectedRecipe} onNavigate={setCurrentPage} />
//       case "video-sharing":
//         return <VideoSharing onVideoSelect={setSelectedVideo} onNavigate={setCurrentPage} />
//       case "video-player":
//         return <VideoPlayer video={selectedVideo} onBack={() => setCurrentPage("video-sharing")} />
//       default:
//         return <LandingPage onNavigate={setCurrentPage} />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#F7FFF7]">
//       {isAuthenticated && <Navigation currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />}
//       {renderPage()}
//     </div>
//   )
// }
