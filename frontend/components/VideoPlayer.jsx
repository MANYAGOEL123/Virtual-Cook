"use client"

import { ArrowLeft, ThumbsUp, Share, Download } from "lucide-react"

export default function VideoPlayer({ video, onBack }) {
 const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_CALL || "http://localhost:5000"
  if (!video) return null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button onClick={onBack} className="flex items-center space-x-2 text-[#FF6B6B] hover:text-[#FF6B6B]/80 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Videos</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-lg">Video Player</p>
                <p className="text-sm opacity-75">Duration: {video.duration}</p>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{video.title}</h1>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold text-gray-800">{video.uploader}</p>
                  <p className="text-sm text-gray-500">
                    {video.views.toLocaleString()} views • {video.uploadDate}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#4ECDC4] text-white rounded-lg hover:bg-[#4ECDC4]/90 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Related Videos</h2>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <img
                  src={`/placeholder.svg?height=80&width=120`}
                  alt="Related video"
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2">Related Cooking Video {i}</h4>
                  <p className="text-xs text-gray-500 mt-1">Chef Name</p>
                  <p className="text-xs text-gray-500">5:30</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
