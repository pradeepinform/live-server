const express = require("express");
const router = express.Router();
const gradientController = require("../controllers/gradientController.js");

// GET all gradients
router.get("/", gradientController.getAllGradients);

// POST insert default gradients (for seeding)
router.post("/gradient", gradientController.insertDefaultGradients);

module.exports = router;
