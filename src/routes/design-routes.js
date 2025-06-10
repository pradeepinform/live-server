const express = require("express");
const router = express.Router();

// Middleware
const authenticatedRequest = require("../middleware/auth-middleware");

// Controller
const designController = require("../controllers/design-controller");

// Apply authentication middleware to all routes
router.use(authenticatedRequest);

// GET all designs of a user
router.get("/", designController.getUserDesigns);

// GET single design by ID
router.get("/:id", designController.getUserDesignsByID);

// POST a new design
router.post("/", designController.saveDesign);

// DELETE a design by ID
router.delete("/:id", designController.deleteDesign);

module.exports = router;
