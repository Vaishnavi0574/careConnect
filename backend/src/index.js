import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import path from "path";

import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/requestRoute.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// -------------------- ENV --------------------
const PORT = process.env.PORT || 3000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

// -------------------- SOCKET.IO --------------------
const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL],
    credentials: true,
  },
});

// attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// -------------------- CORS --------------------
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(cookieParser());

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

// -------------------- MONGODB --------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/wecApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------- SOCKET EVENTS --------------------
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// -------------------- SERVE FRONTEND (PRODUCTION) --------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "frontend/dist", "index.html")
    );
  });
}

// -------------------- START SERVER --------------------
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// -------------------- EXPORT --------------------
export { io };