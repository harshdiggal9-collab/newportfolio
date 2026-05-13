import express from "express";
import {
  createShowcase,
  deleteShowcase,
  getShowcaseOne,
  getShowcases,
  getShowcasesAdmin,
  updateShowcase
} from "../controllers/showcaseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getShowcases);
router.get("/admin/all", protect, getShowcasesAdmin);
router.get("/item/:identifier", getShowcaseOne);
router.post("/", protect, createShowcase);
router.put("/:id", protect, updateShowcase);
router.delete("/:id", protect, deleteShowcase);

export default router;
