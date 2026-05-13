import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import seedAdmin from "./config/seedAdmin.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import showcaseRoutes from "./routes/showcaseRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

await connectDB();
await seedAdmin();

app.use(express.json({ limit: "10mb" }));

app.use(
  cors()
);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/showcase", showcaseRoutes);
app.use("/api/clients", clientRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});