require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const designRoutes = require("./routes/design-routes.js");
const gradientRoutes = require("./routes/gradientRoutes.js");
const s3Routes = require("./routes/s3Route.js");
const mediaRoutes = require("./routes/upload-routes.js");

const app = express();
const PORT = process.env.PORT || 2000;

// Setup CORS origins from env
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"];

//  Use security middlewares early
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => console.log(" MongoDB Connection Error:", error));

//  Route Mounting
app.use("/designs", designRoutes);
app.use("/api/gradients", gradientRoutes);
app.use("/api/s3", s3Routes);
app.use("/api/media", mediaRoutes);

//  Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
