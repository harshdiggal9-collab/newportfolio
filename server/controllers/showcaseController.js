import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Showcase from "../models/Showcase.js";

const isOid = (s) => /^[0-9a-fA-F]{24}$/.test(String(s));

export const getShowcases = asyncHandler(async (req, res) => {
  const { kind, featured } = req.query;
  const filter = { published: true };
  if (kind) filter.kind = kind;
  if (featured === "true") filter.featured = true;

  const items = await Showcase.find(filter).populate("client").sort({ order: -1, createdAt: -1 });
  res.json({ showcases: items });
});

/** Admin: all including unpublished */
export const getShowcasesAdmin = asyncHandler(async (req, res) => {
  const items = await Showcase.find({}).populate("client").sort({ order: -1, createdAt: -1 });
  res.json({ showcases: items });
});

export const getShowcaseOne = asyncHandler(async (req, res) => {
  const { identifier } = req.params;
  let doc;
  if (isOid(identifier)) doc = await Showcase.findById(identifier).populate("client");
  else doc = await Showcase.findOne({ slug: identifier }).populate("client");
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ showcase: doc });
});

export const createShowcase = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.slug = payload.slug || slugify(payload.title || "", { lower: true, strict: true });
  if (!payload.client || payload.client === "") payload.client = null;
  if (payload.client && !isOid(String(payload.client))) payload.client = null;

  const doc = await Showcase.create(payload);
  res.status(201).json(doc);
});

export const updateShowcase = asyncHandler(async (req, res) => {
  const doc = await Showcase.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  const payload = { ...req.body };
  if (payload.slug === "") delete payload.slug;
  if (!payload.client || payload.client === "") payload.client = null;
  Object.assign(doc, payload);
  await doc.save();
  res.json(doc);
});

export const deleteShowcase = asyncHandler(async (req, res) => {
  const doc = await Showcase.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  await doc.deleteOne();
  res.json({ message: "Deleted" });
});
