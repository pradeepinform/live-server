import express from "express";
import multer from "multer";
import { uploadFile, getFiles } from "../controllers/s3BucketController.js";

const router = express.Router();

// memory storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getFiles);

export default router;
