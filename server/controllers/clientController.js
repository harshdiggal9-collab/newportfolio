import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Client from "../models/Client.js";

export const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({}).sort({ order: -1, createdAt: -1 });
  res.json({ clients });
});

export const createClient = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.slug = payload.slug || slugify(payload.name || "", { lower: true, strict: true });
  const doc = await Client.create(payload);
  res.status(201).json(doc);
});

export const updateClient = asyncHandler(async (req, res) => {
  const doc = await Client.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  Object.assign(doc, req.body);
  await doc.save();
  res.json(doc);
});

export const deleteClient = asyncHandler(async (req, res) => {
  const doc = await Client.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  await doc.deleteOne();
  res.json({ message: "Deleted" });
});
