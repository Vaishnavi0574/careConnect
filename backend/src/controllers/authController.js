import User from "../models/User.js";
import { verifyToken, generateToken } from "../lib/jwt.js";
import dotenv from "dotenv";

dotenv.config();

// ------------------ COOKIE OPTIONS ------------------
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  path: "/",
  maxAge: 2 * 60 * 60 * 1000,
};

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("token", token, cookieOptions);

    console.log("Token sent to browser:", token);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ------------------ GET CURRENT USER ------------------
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("getCurrentUser error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      ...cookieOptions,
      maxAge: 0,
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};