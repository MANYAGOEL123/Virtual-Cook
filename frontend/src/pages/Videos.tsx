import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { videoAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  VideoCameraIcon, 
  PlayIcon, 
  EyeIcon, 
  ClockIcon,
  PlusIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Videos: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    recipeId: '',
    description: ''
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await videoAPI.getAllVideos();
      setVideos(fetchedVideos.filter(video => video.status === 'approved'));
    } catch (error) {
      toast.error('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !uploadData.recipeId) {
      toast.error('Please select a file and provide recipe ID');
      return;
    }

    setUploadLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('recipeId', uploadData.recipeId);
      formData.append('description', uploadData.description);
      
      const uploadedVideo = await videoAPI.uploadVideo(formData);
      
      toast.success('Video uploaded successfully! It will be reviewed before appearing publicly.');
      setShowUploadForm(false);
      setSelectedFile(null);
      setUploadData({ recipeId: '', description: '' });
      
      // Optionally refresh videos list
      fetchVideos();
    } catch (error) {
      toast.error('Failed to upload video');
    } finally {
      setUploadLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Recipe Videos</h1>
            <p className="text-gray-600">
              Watch cooking videos from the community and share your own culinary creations!
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Video
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
            Upload Recipe Video
          </h2>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label htmlFor="recipeId" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe ID *
              </label>
              <input
                type="text"
                id="recipeId"
                value={uploadData.recipeId}
                onChange={(e) => setUploadData(prev => ({ ...prev, recipeId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter the recipe ID this video is for"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                You can find the recipe ID in the URL when viewing a recipe page.
              </p>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Video Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={uploadData.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your cooking video..."
              />
            </div>
            
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
                Video File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  required
                />
                <label htmlFor="video" className="cursor-pointer">
                  <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {selectedFile ? (
                    <div>
                      <p className="text-gray-900 font-medium">{selectedFile.name}</p>
                      <p className="text-gray-500 text-sm">
                        Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-900 font-medium">Click to select video file</p>
                      <p className="text-gray-500 text-sm">MP4, MOV, AVI up to 100MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploadLoading}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadLoading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <VideoCameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to share a cooking video with the community!
          </p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
          >
            Upload First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <video
                  className="w-full h-48 object-cover"
                  poster={video.thumbnailUrl}
                  controls
                >
                  <source src={`http://localhost:5000/api/videos/stream/${video._id}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {formatDuration(video.duration)}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.description || 'Recipe Video'}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {formatViews(video.views)} views
                  </div>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Chef</span>
                  </div>
                  
                  <button className="text-primary-600 hover:text-primary-700 p-2 rounded-full hover:bg-primary-50">
                    <PlayIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Showing {videos.length} videos</p>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Load More Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default Videos;