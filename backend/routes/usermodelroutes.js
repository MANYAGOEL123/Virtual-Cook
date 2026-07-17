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
import {athorize} from "../upload/authorize.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/toggle-save", protect, toggleSavedRecipe);
router.get("/", protect, authorize("admin"), getAllUsers);
router.patch(
  "/:id/make-admin",
  protect,
  authorize("admin"),
  makeAdmin
);
export default router;
