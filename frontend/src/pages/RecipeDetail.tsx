import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe, Comment, Video } from '../types';
import { recipeAPI, commentAPI, likeAPI, videoAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  ClockIcon, 
  UserIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  const fetchRecipeData = async () => {
    if (!id) return;
    
    try {
      const [recipeData, commentsData, likedStatus, likesCountData] = await Promise.all([
        recipeAPI.getRecipeById(id),
        commentAPI.getComments('recipe', id),
        likeAPI.checkIfLiked('recipe', id),
        likeAPI.getLikes('recipe', id)
      ]);
      
      setRecipe(recipeData);
      setComments(commentsData);
      setIsLiked(likedStatus);
      setLikesCount(likesCountData);
      
      // Fetch videos if they exist
      if (recipeData.videoIds.length > 0) {
        const videoPromises = recipeData.videoIds.map(videoId => videoAPI.getVideoById(videoId));
        const videosData = await Promise.all(videoPromises);
        setVideos(videosData);
      }
    } catch (error) {
      toast.error('Failed to fetch recipe details');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!id) return;
    
    try {
      const result = await likeAPI.toggleLike('recipe', id);
      setIsLiked(result.liked);
      setLikesCount(prev => result.liked ? prev + 1 : prev - 1);
    } catch (error) {
      toast.error('Failed to update like status');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;
    
    setCommentLoading(true);
    try {
      const comment = await commentAPI.createComment({
        entityType: 'recipe',
        entityId: id,
        text: newComment
      });
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const formatTime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Recipe not found</p>
        <Link to="/" className="text-primary-600 hover:text-primary-500 mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-64 md:h-80 bg-gray-200 relative">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-6xl">🍽️</span>
            </div>
          )}
        </div>
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-red-500 hover:text-red-600"
              >
                {isLiked ? (
                  <HeartIconSolid className="h-6 w-6" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
                <span>{likesCount}</span>
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Prep Time</div>
              <div className="font-semibold">{formatTime(recipe.prepTime)}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Cook Time</div>
              <div className="font-semibold">{formatTime(recipe.cookingTime)}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <UserIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Servings</div>
              <div className="font-semibold">{recipe.servings || 'N/A'}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl mb-2 block">🍽️</span>
              <div className="text-sm text-gray-600">Cuisine</div>
              <div className="font-semibold">{recipe.cuisine || 'N/A'}</div>
            </div>
          </div>
          
          {recipe.nutritionalInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Nutritional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="font-semibold">{recipe.nutritionalInfo.calories || 'N/A'}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Protein</div>
                  <div className="font-semibold">{recipe.nutritionalInfo.protein || 'N/A'}g</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-gray-600">Fat</div>
                  <div className="font-semibold">{recipe.nutritionalInfo.fat || 'N/A'}g</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-gray-600">Carbs</div>
                  <div className="font-semibold">{recipe.nutritionalInfo.carbs || 'N/A'}g</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                <span>{ingredient.quantity} {ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <VideoCameraIcon className="h-6 w-6 mr-2" />
            Recipe Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="bg-gray-100 rounded-lg p-4">
                <video
                  controls
                  className="w-full h-48 rounded-lg"
                  poster={video.thumbnailUrl}
                >
                  <source src={`http://localhost:5000/api/videos/stream/${video._id}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-2 text-sm text-gray-600">{video.description}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{video.views} views</span>
                  <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <ChatBubbleLeftIcon className="h-6 w-6 mr-2" />
          Comments ({comments.length})
        </h2>
        
        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this recipe..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            type="submit"
            disabled={commentLoading || !newComment.trim()}
            className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {commentLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">User</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;