import { uploadFileToS3, listFilesFromS3 } from "../services/s3Service.js"; // मानते हैं ये functions defined हैं

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res.status(400).json({ message: "File not provided" });

    const result = await uploadFileToS3(file);
    console.log("S3 File Uploaded:", result);
    res.status(200).json({ message: "Upload Successful", data: result });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await listFilesFromS3();
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};
