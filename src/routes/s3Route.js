const express = require('express');
const multer = require('multer');
const { uploadFile, getFiles } = require('../controllers/s3BucketController');

const router = express.Router();

// memory storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);

module.exports = router;
