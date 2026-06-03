import { Request, Response } from "express";
import pool from "../config/db";
import { getIO } from "../sockets/socket";

export const reserveSlot = async (
  req: Request,
  res: Response
) => {
  const client = await pool.connect();

  try {
    const { userId, slotId } = req.body;

    await client.query("BEGIN");

    const slotCheck = await client.query(
      `
      SELECT *
      FROM slots
      WHERE id = $1
      FOR UPDATE
      `,
      [slotId]
    );

    if (slotCheck.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Slot not found",
      });
    }

    const slot = slotCheck.rows[0];

    if (slot.status !== "AVAILABLE") {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Slot already reserved/booked",
      });
    }

    const expiresAt = new Date(
      Date.now() + 2 * 60 * 1000
    );

    await client.query(
      `
      INSERT INTO reservations
      (user_id,slot_id,expires_at)
      VALUES ($1,$2,$3)
      `,
      [userId, slotId, expiresAt]
    );

    await client.query(
      `
      UPDATE slots
      SET status='RESERVED'
      WHERE id=$1
      `,
      [slotId]
    );

    await client.query("COMMIT");

getIO().to(slot.pitch_id).emit(
  "slot-updated",
  {
    slotId,
    status: "RESERVED",
  }
);

return res.status(201).json({
  message: "Slot reserved",
  expiresAt,
});
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return res.status(500).json({
      message: "Reservation failed",
    });
  } finally {
    client.release();
  }
};

export const confirmBooking = async (
  req: Request,
  res: Response
) => {
  const client = await pool.connect();

  try {
    const {
  userId,
  slotId,
  pitchId,
  bookingDate,
} = req.body;

    await client.query("BEGIN");

    const reservation = await client.query(
      `
      SELECT *
      FROM reservations
      WHERE user_id = $1
      AND slot_id = $2
      `,
      [userId, slotId]
    );

    if (reservation.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "No active reservation found",
      });
    }

    const reservationData = reservation.rows[0];

    if (
      new Date(reservationData.expires_at) <
      new Date()
    ) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Reservation expired",
      });
    }

    await client.query(
      `
      INSERT INTO bookings
      (
        user_id,
        pitch_id,
        slot_id,
        booking_date,
        status
      )
      VALUES
      ($1,$2,$3,$4,'CONFIRMED')
      `,
      [userId, pitchId, slotId, bookingDate]
    );

    await client.query(
      `
      UPDATE slots
      SET status='BOOKED'
      WHERE id=$1
      `,
      [slotId]
    );

    await client.query(
      `
      DELETE FROM reservations
      WHERE slot_id=$1
      `,
      [slotId]
    );

    await client.query("COMMIT");

getIO().to(pitchId).emit(
  "slot-updated",
  {
    slotId,
    status: "BOOKED",
  }
);

return res.status(201).json({
  message: "Booking Confirmed",
});
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return res.status(500).json({
      message: "Booking failed",
    });
  } finally {
    client.release();
  }
};

export const getMyBookings = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const result = await pool.query(
      `
      SELECT
        b.id,
        b.booking_date,
        b.status,
        p.name AS pitch_name,
        p.location,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN pitches p
        ON p.id = b.pitch_id
      JOIN slots s
        ON s.id = b.slot_id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
      `,
      [user.id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};