import axios from 'axios';
import { 
  User, 
  Recipe, 
  Video, 
  Comment, 
  LoginCredentials, 
  RegisterData,
  UserPantryItem,
  RecipeFilters 
} from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User/Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  toggleSavedRecipe: async (recipeId: string): Promise<{ message: string }> => {
    const response = await api.post('/users/toggle-save', { recipeId });
    return response.data;
  },
};

// Recipe API
export const recipeAPI = {
  getAllRecipes: async (filters?: RecipeFilters): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.cuisine) params.append('cuisine', filters.cuisine);
    if (filters?.maxCookingTime) params.append('maxCookingTime', filters.maxCookingTime.toString());
    
    const response = await api.get(`/recipes?${params.toString()}`);
    return response.data;
  },

  getRecipeById: async (id: string): Promise<Recipe> => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  createRecipe: async (recipe: Omit<Recipe, '_id' | 'createdAt' | 'updatedAt' | 'authorId' | 'averageRating' | 'totalLikes' | 'status'>): Promise<Recipe> => {
    const response = await api.post('/recipes', recipe);
    return response.data;
  },

  updateRecipe: async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
    const response = await api.put(`/recipes/${id}`, recipe);
    return response.data;
  },

  deleteRecipe: async (id: string): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },

  searchRecipesByIngredients: async (ingredients: string[]): Promise<Recipe[]> => {
    const response = await api.post('/recipes/search-by-ingredients', { ingredients });
    return response.data;
  },
};

// Video API
export const videoAPI = {
  getAllVideos: async (): Promise<Video[]> => {
    const response = await api.get('/videos');
    return response.data;
  },

  getVideoById: async (id: string): Promise<Video> => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  uploadVideo: async (formData: FormData): Promise<Video> => {
    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  streamVideo: async (id: string): Promise<string> => {
    return `${api.defaults.baseURL}/videos/stream/${id}`;
  },

  deleteVideo: async (id: string): Promise<void> => {
    await api.delete(`/videos/${id}`);
  },
};

// Comment API
export const commentAPI = {
  getComments: async (entityType: 'recipe' | 'video', entityId: string): Promise<Comment[]> => {
    const response = await api.get(`/comments?entityType=${entityType}&entityId=${entityId}`);
    return response.data;
  },

  createComment: async (comment: { entityType: 'recipe' | 'video'; entityId: string; text: string }): Promise<Comment> => {
    const response = await api.post('/comments', comment);
    return response.data;
  },

  updateComment: async (id: string, text: string): Promise<Comment> => {
    const response = await api.put(`/comments/${id}`, { text });
    return response.data;
  },

  deleteComment: async (id: string): Promise<void> => {
    await api.delete(`/comments/${id}`);
  },
};

// Like API
export const likeAPI = {
  toggleLike: async (entityType: 'recipe' | 'video', entityId: string): Promise<{ liked: boolean }> => {
    const response = await api.post('/likes/toggle', { entityType, entityId });
    return response.data;
  },

  getLikes: async (entityType: 'recipe' | 'video', entityId: string): Promise<number> => {
    const response = await api.get(`/likes?entityType=${entityType}&entityId=${entityId}`);
    return response.data.count;
  },

  checkIfLiked: async (entityType: 'recipe' | 'video', entityId: string): Promise<boolean> => {
    const response = await api.get(`/likes/check?entityType=${entityType}&entityId=${entityId}`);
    return response.data.liked;
  },
};

// User Pantry API
export const pantryAPI = {
  getUserPantry: async (userId: string): Promise<UserPantryItem[]> => {
    const response = await api.get(`/user-pantry/${userId}`);
    return response.data;
  },

  addPantryItem: async (item: Omit<UserPantryItem, '_id'>): Promise<UserPantryItem> => {
    const response = await api.post('/user-pantry', item);
    return response.data;
  },

  updatePantryItem: async (id: string, item: Partial<UserPantryItem>): Promise<UserPantryItem> => {
    const response = await api.put(`/user-pantry/${id}`, item);
    return response.data;
  },

  deletePantryItem: async (id: string): Promise<void> => {
    await api.delete(`/user-pantry/${id}`);
  },
};

export default api;