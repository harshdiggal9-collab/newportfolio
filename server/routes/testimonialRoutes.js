import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials
} from "../controllers/testimonialController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getTestimonials);
router.post("/", protect, createTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;
