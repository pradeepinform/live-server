const mongoose = require("mongoose");

const gradientSchema = new mongoose.Schema({
  colors: {
    type: [String],  // Array of strings
    required: true,
  },
});

const Gradient = mongoose.model("Gradient", gradientSchema);
module.exports = Gradient;
