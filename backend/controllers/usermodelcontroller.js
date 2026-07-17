import User from "../models/usermodels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username,
      email,
      passwordHash: password
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ success: true, user });
};


export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true
    }).select("-passwordHash");

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const toggleSavedRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findById(req.user._id);

    const alreadySaved = user.savedRecipeIds.includes(recipeId);

    if (alreadySaved) {
      user.savedRecipeIds.pull(recipeId);
    } else {
      user.savedRecipeIds.push(recipeId);
    }

    await user.save();
    res.status(200).json({
      success: true,
      savedRecipeIds: user.savedRecipeIds
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.role = "admin";

    await user.save();

    res.json({
      message: "User promoted to admin successfully."
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
