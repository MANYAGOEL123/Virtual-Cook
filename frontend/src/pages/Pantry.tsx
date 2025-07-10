import React, { useState, useEffect } from 'react';
import { UserPantryItem, PantryIngredient, Recipe } from '../types';
import { pantryAPI, recipeAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon, MinusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Pantry: React.FC = () => {
  const { user } = useAuth();
  const [pantryItems, setPantryItems] = useState<UserPantryItem[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    ingredientName: '',
    quantity: '',
    unit: ''
  });

  useEffect(() => {
    if (user) {
      fetchPantryItems();
    }
  }, [user]);

  useEffect(() => {
    if (pantryItems.length > 0) {
      getRecipeRecommendations();
    }
  }, [pantryItems]);

  const fetchPantryItems = async () => {
    if (!user) return;
    
    try {
      const items = await pantryAPI.getUserPantry(user._id);
      setPantryItems(items);
    } catch (error) {
      toast.error('Failed to fetch pantry items');
    } finally {
      setLoading(false);
    }
  };

  const getRecipeRecommendations = async () => {
    try {
      const ingredients = pantryItems.map(item => item.ingredient_id);
      const recipes = await recipeAPI.searchRecipesByIngredients(ingredients);
      setRecommendedRecipes(recipes.slice(0, 6)); // Limit to 6 recommendations
    } catch (error) {
      console.error('Failed to get recipe recommendations');
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newItem.ingredientName || !newItem.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const item = {
        user_id: user._id,
        ingredient_id: newItem.ingredientName, // In a real app, this would be an actual ingredient ID
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit
      };

      const addedItem = await pantryAPI.addPantryItem(item);
      setPantryItems(prev => [...prev, addedItem]);
      setNewItem({ ingredientName: '', quantity: '', unit: '' });
      setShowAddForm(false);
      toast.success('Ingredient added to pantry');
    } catch (error) {
      toast.error('Failed to add ingredient');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await pantryAPI.deletePantryItem(itemId);
      setPantryItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Ingredient removed from pantry');
    } catch (error) {
      toast.error('Failed to remove ingredient');
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const updatedItem = await pantryAPI.updatePantryItem(itemId, { quantity: newQuantity });
      setPantryItems(prev => prev.map(item => 
        item._id === itemId ? updatedItem : item
      ));
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Pantry</h1>
        <p className="text-gray-600">
          Manage your ingredients and discover recipes you can make with what you have!
        </p>
      </div>

      {/* Add Ingredient Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Ingredients</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Ingredient
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddItem} className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ingredientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Name *
                </label>
                <input
                  type="text"
                  id="ingredientName"
                  value={newItem.ingredientName}
                  onChange={(e) => setNewItem(prev => ({ ...prev, ingredientName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Tomatoes, Chicken breast"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="1"
                />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  value={newItem.unit}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="cups, lbs, pieces"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Add to Pantry
              </button>
            </div>
          </form>
        )}

        {/* Pantry Items Grid */}
        {pantryItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🥘</div>
            <p className="text-gray-500 text-lg mb-4">Your pantry is empty!</p>
            <p className="text-gray-400">Add some ingredients to get started and discover recipes you can make.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pantryItems.map((item) => (
              <div key={item._id} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.ingredient_id}</h3>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item._id, parseFloat(e.target.value))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-sm text-gray-600">{item.unit || 'units'}</span>
                </div>
                {item.expires_at && (
                  <p className="text-xs text-gray-500 mt-2">
                    Expires: {new Date(item.expires_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Recommendations */}
      {recommendedRecipes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <MagnifyingGlassIcon className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Recipes You Can Make</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.map((recipe) => (
              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gray-200 relative">
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-3xl">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{recipe.cookingTime || 'N/A'} min</span>
                    <span>{recipe.servings || 'N/A'} servings</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {recommendedRecipes.length === 6 && (
            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View all recipes →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pantry;