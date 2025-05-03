import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    console.log(newUser);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.log("Error creating User", error);
    res.status(500).json({
      error: "Error creating user",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      console.log();
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully ",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tole: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(401).json({
      error: "Error logging in User",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(204).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error logging out",
    });
  }
};
export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(401).json({
      error: "Error authenticating user",
    });
  }
};
