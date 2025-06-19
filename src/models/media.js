import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, 
  },
  name: String,
  cloudinaryId: String,
  url: String,
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
export default Media;
