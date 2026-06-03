import express from "express";
import cors from "cors";
import pool from "./config/db";
import authRoutes from "./routes/auth.routes";
import pitchRoutes from "./routes/pitch.routes";
import bookingRoutes from "./routes/booking.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/pitches", pitchRoutes);

app.get("/", async (_, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({
      message: "Database Connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database Connection Failed",
    });
  }
});

export default app;