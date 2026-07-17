import express from "express";
import { createComment, getCommentsByEntity, deleteComment } from "../controllers/commentcontroller.js";
import { protect } from "../upload/authmiddleware.js";
import { validateComment } from "../upload/commentvalidator.js";


router.post("/", protect, validateComment, createComment);


router.get("/:entityType/:entityId", getCommentsByEntity);


router.delete("/:id", protect, deleteComment);

export default router;
