import { Request, Response } from "express";
import pool from "../config/db";

export const getPitches = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pitches ORDER BY name"
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch pitches",
    });
  }
};

export const getSlotsByPitch = async (
  req: Request,
  res: Response
) => {
  try {
    const { pitchId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM slots
      WHERE pitch_id = $1
      ORDER BY start_time
      `,
      [pitchId]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch slots",
    });
  }
};