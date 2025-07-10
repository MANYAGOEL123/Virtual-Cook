import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  toggleSavedRecipe,
  getAllUsers
} from "../controllers/usermodelcontroller.js";
import { protect } from "../upload/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/toggle-save", protect, toggleSavedRecipe);
router.get("/", protect, getAllUsers); // you can limit this to admin only

export default router;
