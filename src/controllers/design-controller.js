// Importing the Design model from the models directory
const Design = require("../models/design");

/**
 * Controller to get all designs for a specific user
 */
exports.getUserDesigns = async (req, res) => {
  try {
    // Extracting userId from the authenticated user (middleware should set req.user)
    const userId = req.user.userId;

    // Fetch all designs that belong to the user, sorted by most recently updated
    const designs = await Design.find({ userId }).sort({ updatedAt: -1 });

    // Return the designs with a success response
    res.status(200).json({
      success: true,
      data: designs,
    });
  } catch (error) {
    // Log error and return server error response
    console.error("Error fetching designs", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

/**
 * Controller to get a single design by its ID for the authenticated user
 */
exports.getUserDesignsByID = async (req, res) => {
  try {
    // Extract userId from authenticated user
    const userId = req.user.userId;

    // Extract design ID from URL parameters
    const designId = req.params.id;

    // Find the design by ID and ensure it belongs to the user
    const design = await Design.findOne({ _id: designId, userId });

    // If not found, send 404 error
    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to view it.",
      });
    }

    // Return the found design
    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    // Log error and return failure response
    console.error("Error fetching design by ID", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch design by ID",
    });
  }
};

/**
 * Controller to either update an existing design or create a new one
 */
exports.saveDesign = async (req, res) => {
  try {
    // Extract userId from authenticated user
    const userId = req.user.userId;

    // Destructure the design data from the request body
    const { designId, name, canvasData, width, height, category } = req.body;

    // If designId is provided, attempt to update existing design
    if (designId) {
      // Find the design and check if it belongs to the user
      const design = await Design.findOne({ _id: designId, userId });

      // If not found, return 404
      if (!design) {
        return res.status(404).json({
          success: false,
          message: "Design not found! or you don't have permission to view it.",
        });
      }

      // Update fields if they are provided
      if (name) design.name = name;
      if (canvasData) design.canvasData = canvasData;
      if (width) design.width = width;
      if (height) design.height = height;
      if (category) design.category = category;

      // Update the last modified timestamp
      design.updatedAt = Date.now();

      // Save the updated design to the database
      const updatedDesign = await design.save();

      // Return the updated design
      return res.status(200).json({
        success: true,
        data: updatedDesign,
      });
    } else {
      // If no designId, create a new design
      const newDesign = new Design({
        userId, // Associate with current user
        name: name || " Teamlans Design", // Default name if not provided
        width,
        height,
        canvasData,
        category,
      });

      // Save new design to the database
      const saveDesign = await newDesign.save();

      // Return the newly created design
      return res.status(200).json({
        success: true,
        data: saveDesign,
      });
    }
  } catch (error) {
    // Log and return internal server error
    console.error("Error while saving design", error);
    res.status(500).json({
      success: false,
      message: "Failed to save design",
    });
  }
};

/**
 * Controller to delete a design by its ID if it belongs to the user
 */
exports.deleteDesign = async (req, res) => {
  try {
    // Extract userId from authenticated user
    const userId = req.user.userId;

    // Extract design ID from URL parameters
    const designId = req.params.id;

    // Find the design and ensure it belongs to the user
    const design = await Design.findOne({ _id: designId, userId });

    // If design not found or unauthorized access, return 404
    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to delete it.",
      });
    }

    // Delete the design
    await Design.deleteOne({ _id: designId });

    // Return success message
    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    // Log and return server error
    console.error("Error While deleting design", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};


