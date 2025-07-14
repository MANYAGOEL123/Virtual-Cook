"use client"

import { Play, Eye } from "lucide-react"

export default function VideoCard({ video, onClick }) {
  const BACKEND_API=process.env.NEXT_PUBLIC_BACKEND_CALL;
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-t-2xl">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Play className="h-8 w-8 text-[#FF6B6B] ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#4ECDC4]">{video.uploader}</span>
          <span className="text-xs text-gray-500">{video.uploadDate}</span>
        </div>

        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{video.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}
