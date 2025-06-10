
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require('./middleware/auth-middleware');
const designRoutes = require("./routes/design-routes")
const gradientRoutes = require("./routes/gradientRoutes.js");
const s3Routes = require('./routes/s3Route.js')
const app = express();
const PORT = process.env.PORT || 2000;
const mediaRoutes = require('./routes/upload-routes.js');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Error", error));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/designs", designRoutes);
// Import Routes
app.use("/api/gradients", gradientRoutes);

app.use('/api/s3', s3Routes);
app.use('/api/media', mediaRoutes)



async function startServer() {
  try {
    app.listen(PORT, () =>
      console.log(`DESIGN Service running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connected to server", error);
    process.exit(1);
  }
}

startServer();


