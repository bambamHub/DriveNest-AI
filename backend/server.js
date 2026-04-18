const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

// 🔹 Load env variables
dotenv.config();

// 🔹 Connect DB
connectDB();

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// 🔹 CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// 🔥 STATIC FILE SERVING (VERY IMPORTANT)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/folders", require("./routes/folderRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

// 🔹 Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 DriveNest API is running",
  });
});

// 🔴 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 🔴 Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});