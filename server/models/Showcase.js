import mongoose from "mongoose";

const mediaShape = {
  url: String,
  publicId: String
};

const showcaseSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["image", "youtube"], required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    /** Image showcase OR thumbnail for video */
    image: mediaShape,
    youtubeUrl: { type: String, default: "" },
    /** Skills / tools used */
    skillsUsed: [{ type: String }],
    tags: [{ type: String }],
    /** Type of client this work was for (niche) */
    clientCategory: { type: String, default: "" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", default: null },
    toolsUsed: { type: String, default: "" },
    outcome: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Showcase", showcaseSchema);
