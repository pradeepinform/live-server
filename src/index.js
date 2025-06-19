import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Import Routes
import designRoutes from "./routes/design-routes.js";
import gradientRoutes from "./routes/gradientRoutes.js";
import s3Routes from "./routes/s3Route.js";
import mediaRoutes from "./routes/upload-routes.js";
import authRouters from "./routes/authRoutes.js";

// Load env variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(cors({
  origin: process.env.UI_URL,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// 🔍 Request Logging (dev)
app.use((req, res, next) => {
  console.log("🔍 Incoming Request:", req.method, req.url);
  console.log("🧾 Origin:", req.headers.origin);
  console.log("🛂 Authorization Header:", req.headers.authorization);
  next();
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routes
app.use("/designs", designRoutes);
app.use("/api/gradients", gradientRoutes);
app.use("/api/s3", s3Routes);
app.use("/api/media", mediaRoutes);
app.use("/api/auth", authRouters);

// Test route
app.get("/test", (req, res) => {
  console.log("🍪 Test cookie:", req.cookies);
  res.send("OK");
});

