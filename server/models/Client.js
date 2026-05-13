import mongoose from "mongoose";

const logoShape = {
  url: String,
  publicId: String
};

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: logoShape,
    description: { type: String, default: "" },
    /** E.g. Startup, Brand, Agency, Creator */
    clientType: { type: String, default: "" },
    workDoneCount: { type: Number, default: 0 },
    workDoneLabel: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
