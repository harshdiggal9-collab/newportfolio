import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    quote: String
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
