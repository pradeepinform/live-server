const express = require("express");
const router = express.Router();

// Middleware
const authenticatedRequest = require("../middleware/auth-middleware");

// Controller
const designController = require("../controllers/design-controller");
const authMiddleware = require("../middleware/auth-middleware");

// Apply authentication middleware to all routes
router.use(authenticatedRequest);

// GET all designs of a user
// router.get("/", designController.getUserDesigns);

router.get("/designs", authMiddleware, async (req, res) => {
  // You can access `req.user` here
  res.json({ message: "Secure design data", user: req.user });
});

// GET single design by ID
router.get("/:id", designController.getUserDesignsByID);

// POST a new design
router.post("/", designController.saveDesign);

// DELETE a design by ID
router.delete("/:id", designController.deleteDesign);

module.exports = router;
