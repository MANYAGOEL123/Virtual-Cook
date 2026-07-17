import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import videoRoutes from './routes/videostreamingroutes.js';
import commentRoutes from './routes/commentroutes.js';
import likeRoutes from "./routes/likeroutes.js";
import fs from 'fs';
import ratingRoutes from "./routes/ratingroutes.js";
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());

// ✅ Root route (important for Render health check & user confirmation)
app.get("/", (req, res) => {
  res.send("✅ Virtual Cook Backend is running! Use /api/... endpoints.");
});
console.log("Loading routes...");
const routePath = path.join(__dirname, 'routes');
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

// log which route files are loaded
fs.readdirSync(routePath).forEach(file => {
  console.log(`Loaded route file: ${file}`);
});

// ✅ Optionally serve frontend build if needed
const frontendPath = path.resolve(__dirname, '../frontend/.next');
app.use(express.static(frontendPath));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
