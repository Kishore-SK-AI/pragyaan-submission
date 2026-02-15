import jwt from "jsonwebtoken";
import {
  Admin,
  Doctor,
  Pharmacist,
  Nurse,
  Receptionist,
} from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let Model;

    // Select model based on role
    switch (role) {
      case "Admin":
        Model = Admin;
        break;
      case "Doctor":
        Model = Doctor;
        break;
      case "Pharmacist":
        Model = Pharmacist;
        break;
      case "Nurse":
        Model = Nurse;
        break;
      case "Receptionist":
        Model = Receptionist;
        break;
      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    // Find user by email
    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simple password check (plain text)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1d" },
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(`User ${user.email} logged in as ${user.role}`);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const getMe = async (req, res) => {
  try {
    const { id, role } = req.user;
    let Model;

    switch (role) {
      case "Admin":
        Model = Admin;
        break;
      case "Doctor":
        Model = Doctor;
        break;
      case "Pharmacist":
        Model = Pharmacist;
        break;
      case "Nurse":
        Model = Nurse;
        break;
      case "Receptionist":
        Model = Receptionist;
        break;
      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    const user = await Model.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
