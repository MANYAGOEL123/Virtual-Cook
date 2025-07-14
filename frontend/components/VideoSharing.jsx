"use client"

import { useState, useEffect } from "react"
import VideoCard from "./VideoCard"
import { Upload, Search } from "lucide-react"

export default function VideoSharing({ onVideoSelect, onNavigate }) {
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_CALL

  const [videos, setVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [error, setError] = useState(null)

  const categories = ["all", "techniques", "recipes", "baking", "desserts"]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BACKEND_API}/api/videos`)
        if (!res.ok) {
          throw new Error("Failed to fetch videos")
        }
        const data = await res.json()
        console.log("Fetched videos:", data) 
        setVideos(data)
      } catch (err) {
        console.error("Error fetching videos:", err)
        setError("Unable to load videos. Please try again later.")
      }
    }
    fetchVideos()
  }, [BACKEND_API])

  const filteredVideos = videos.filter(
    (video) =>
      video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.uploader?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleVideoClick = (video) => {
    onVideoSelect(video)
    onNavigate("video-player")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Cooking Videos</h1>
        <p className="text-xl text-gray-600">Share and discover amazing cooking tutorials</p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Search and Upload */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Video</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#4ECDC4] text-white"
                  : "bg-white text-gray-600 hover:bg-[#4ECDC4]/20"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id || video.id} video={video} onClick={() => handleVideoClick(video)} />
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Cooking Video</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none resize-none"
                  rows="3"
                  placeholder="Describe your video"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#FF6B6B] text-white rounded-xl hover:bg-[#FF6B6B]/90 transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
