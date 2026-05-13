import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ testimonials });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Testimonial removed" });
});
