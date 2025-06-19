import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    canvasData: String,
    width: Number,
    height: Number,
    category: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const Design = mongoose.model("Design", designSchema);

export default Design;
