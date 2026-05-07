import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // <- needed for socket.io
import { Server } from "socket.io"; // <- socket.io server
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/requestRoute.js";

dotenv.config();
const app = express();

// Create HTTP server to attach socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware to attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/wecApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.io connection logging
io.on("connection", (socket) => {
  // console.log(" New client connected:", socket.id);

  socket.on("disconnect", () => {
    // console.log(" Client disconnected:", socket.id);
  });
});

// Start server using HTTP server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io }; // export io if needed elsewhere
