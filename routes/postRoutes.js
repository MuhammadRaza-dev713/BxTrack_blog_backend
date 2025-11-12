import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
