import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    resourceType: { type: String, default: "image" }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    thumbnail: mediaSchema,
    images: [mediaSchema],
    video: mediaSchema,
    youtubeLink: String,
    description: String,
    technologies: [String],
    timeline: String,
    results: String,
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
