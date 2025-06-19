import mongoose from "mongoose";

const gradientSchema = new mongoose.Schema({
  colors: {
    type: [String], // Array of strings
    required: true,
  },
});

const Gradient = mongoose.model("Gradient", gradientSchema);

export default Gradient;
