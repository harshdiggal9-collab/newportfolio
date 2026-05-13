import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Project from "../models/Project.js";
import Category from "../models/Category.js";

export const getProjects = asyncHandler(async (req, res) => {
  const { q, category } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (category) {
    const cat = await Category.findOne({ name: category });
    filter.category = cat?._id;
  }
  const projects = await Project.find(filter).populate("category").sort({ createdAt: -1 });
  res.json({ projects });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).populate("category");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ project });
});

export const createProject = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.slug = payload.slug || slugify(payload.title || "", { lower: true, strict: true });
  if (payload.category && !payload.category.match(/^[0-9a-fA-F]{24}$/)) {
    const cat = await Category.findOneAndUpdate(
      { name: payload.category },
      { name: payload.category },
      { upsert: true, new: true }
    );
    payload.category = cat._id;
  }
  const project = await Project.create(payload);
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  Object.assign(project, req.body);
  await project.save();
  res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  await project.deleteOne();
  res.json({ message: "Project deleted" });
});
