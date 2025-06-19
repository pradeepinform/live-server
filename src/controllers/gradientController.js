import Gradient from "../models/gradient.js";

// GET all gradients
export const getAllGradients = async (req, res) => {
  try {
    const gradients = await Gradient.find({});
    res.json(gradients);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



// POST insert default gradients (once)

