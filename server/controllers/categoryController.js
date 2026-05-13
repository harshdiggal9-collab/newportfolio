import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json(category);
});
