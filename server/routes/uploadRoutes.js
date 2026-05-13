import express from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", protect, upload.single("file"), uploadMedia);

export default router;
