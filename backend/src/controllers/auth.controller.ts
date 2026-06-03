import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `
      INSERT INTO users
      (name,email,password)
      VALUES ($1,$2,$3)
      RETURNING id,name,email
      `,
      [name, email, hashedPassword]
    );

    return res.status(201).json({
      message: "User registered",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
  {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "24h",
  }
);

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMe = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    user: (req as any).user,
  });
};