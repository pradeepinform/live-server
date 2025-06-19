import Media from "../models/media.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No File Found!",
      });
    }

    const { originalname, mimetype, size, width, height } = req.file;
    const { userId } = req.user;

    const cloudinaryResult = await uploadMediaToCloudinary(req.file);

    const newlyCreatedMedia = new Media({
      userId,
      name: originalname,
      cloudinaryId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      mimeType: mimetype,
      size,
      width,
      height,
    });

    await newlyCreatedMedia.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedMedia,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error creating asset",
    });
  }
};

export const getAllMediasByUser = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log("User ID:", userId);

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No user ID" });
    }

    const medias = await Media.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: medias,
    });
  } catch (e) {
    console.error("Fetch media error:", e.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assets",
    });
  }
};
