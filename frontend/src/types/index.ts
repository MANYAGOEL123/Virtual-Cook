// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  profilePictureUrl?: string;
  savedRecipeIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Recipe Types
export interface Ingredient {
  name: string;
  quantity: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime?: number;
  prepTime?: number;
  servings?: number;
  authorId: string;
  videoIds: string[];
  imageUrl?: string;
  cuisine?: string;
  dietaryRestrictions: string[];
  nutritionalInfo?: NutritionalInfo;
  averageRating: number;
  totalLikes: number;
  status: 'pending' | 'approved';
  createdAt: string;
  updatedAt: string;
}

// Video Types
export interface Video {
  _id: string;
  recipeId: string;
  uploaderId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  views: number;
  description?: string;
  status: 'pending' | 'approved';
  uploadDate: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  _id: string;
  entityType: 'recipe' | 'video';
  entityId: string;
  userId: string;
  text: string;
  createdAt: string;
}

// Like Types
export interface Like {
  _id: string;
  entityType: 'recipe' | 'video';
  entityId: string;
  userId: string;
  createdAt: string;
}

// User Pantry Types
export interface UserPantryItem {
  _id: string;
  user_id: string;
  ingredient_id: string;
  quantity: number;
  unit?: string;
  expires_at?: string;
}

export interface PantryIngredient {
  _id: string;
  name: string;
  category?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Recipe Filter Types
export interface RecipeFilters {
  search?: string;
  cuisine?: string;
  dietaryRestrictions?: string[];
  maxCookingTime?: number;
  ingredients?: string[];
}

// Recommendation Types
export interface RecipeRecommendation {
  recipe: Recipe;
  matchPercentage: number;
  missingIngredients: string[];
}