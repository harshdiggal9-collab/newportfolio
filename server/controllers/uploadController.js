import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const resourceType = req.file.mimetype.startsWith("video") ? "video" : "image";
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "premium-portfolio",
    resource_type: resourceType
  });

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
    resourceType
  });
});
