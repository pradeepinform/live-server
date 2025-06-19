import express from "express";
import { getAllGradients } from "../controllers/gradientController.js";
// import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// GET all gradients
router.get("/", getAllGradients);

// POST insert default gradients (for seeding)
// router.post("/gradient",authMiddleware, saveGradientColor);
// router.get("/:id",authMiddleware, getGradientColorId);
// router.delete("/:id",authMiddleware, deleteGradientColor);


export default router;
