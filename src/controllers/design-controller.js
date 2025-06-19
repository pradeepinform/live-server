import Design from "../models/design.js";

export const getUserDesigns = async (req, res) => {
  try {
    const userId = req.user.userId;
    const designs = await Design.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({ success: true, data: designs });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch designs" });
  }
};

export const getUserDesignsByID = async (req, res) => {
  try {
    const userId = req.user.userId;
    const designId = req.params.id;

    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to view it.",
      });
    }

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (e) {
    console.error("Error fetching design by ID", e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch design by ID",
    });
  }
};

export const saveDesign = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { designId, name, canvasData, width, height, category } = req.body;

    if (designId) {
      const updatedDesign = await Design.findOneAndUpdate(
        { _id: designId, userId },
        { name, canvasData, width, height, category, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedDesign) {
        return res.status(404).json({
          success: false,
          message: "Design not found or unauthorized.",
        });
      }

      return res.status(200).json({ success: true, data: updatedDesign });
    } else {
      const newDesign = new Design({
        userId,
        name: name || "Untitled Design",
        canvasData,
        width,
        height,
        category,
      });
      const saved = await newDesign.save();
      return res.status(200).json({ success: true, data: saved });
    }
  } catch (e) {
    console.error("Error while saving design", e);
    res.status(500).json({ success: false, message: "Failed to save design" });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const userId = req.user.userId;
    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to delete it.",
      });
    }

    await Design.deleteOne({ _id: designId });

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (e) {
    console.error("Error while deleting design", e);
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};

//This is Update Design method 
export const updateDesign = async (req, res) => {
  try {
    const userId = req.user.userId; // Middleware se milta hai
    const designId = req.params.id;
    const { name } = req.body;

    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({ success: false, message: "Design not found or unauthorized" });
    }

    design.name = name || design.name;
    design.updatedAt = Date.now();
    const updatedDesign = await design.save();

    return res.status(200).json({ success: true, data: updatedDesign });
  } catch (error) {
    console.error("Error updating design:", error);
    return res.status(500).json({ success: false, message: "Failed to update design" });
  }
};
