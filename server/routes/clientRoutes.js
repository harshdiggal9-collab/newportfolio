import express from "express";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient
} from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getClients);
router.post("/", protect, createClient);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

export default router;
