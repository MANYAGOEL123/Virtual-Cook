import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import videoRoutes from './routes/videostreamingroutes.js';
import commentRoutes from './routes/commentroutes.js';
import likeRoutes from "./routes/likeroutes.js"; // Adjust path as needed
import ratingRoutes from "./routes/ratingroutes.js"; // adjust path if needed
import dietPlanRoutes from "./routes/dietplanroutes.js";
import foodItemRoutes from "./routes/fooditemroutes.js";
import planfooditemRoutes from './routes/planfooditemroutes.js';
import userRoutes from "./routes/usermodelroutes.js";
import ingredientRoutes from './routes/ingredientroutes.js';
import ingredientsubstituteRoutes from './routes/ingredientsubstituteroutes.js';
import recipeingredientRoutes from './routes/recipeingredientroutes.js';
import recipetagRoutes from './routes/recipetagroutes.js';
import recipetagmappingRoutes from './routes/recipetagmappingroutes.js';
import userpantryRoutes from './routes/userpantryroutes.js';
import userdietplanRoutes from './routes/userdietplanroutes.js';







dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true
}));

app.use(express.json());

app.use('/api/recipes', recipeRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/user-diet-plan', userdietplanRoutes);

app.use("/api/likes", likeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/diet-plans", dietPlanRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/users", userRoutes);
app.use('/api/plan-food-items', planfooditemRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/ingredient-substitutes', ingredientsubstituteRoutes);
app.use('/api/recipe-ingredients', recipeingredientRoutes);
app.use('/api/recipe-tags', recipetagRoutes);
app.use('/api/recipe-tag-mappings', recipetagmappingRoutes);
app.use('/api/user-pantry', userpantryRoutes);
app.get('/', (req, res) => {
  res.send('🌐 API is running...');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
