import pool from "../config/db";
import { getIO } from "../sockets/socket";

export const cleanupExpiredReservations =
async () => {
  try {
    const expired =
      await pool.query(`
      SELECT slot_id
      FROM reservations
      WHERE expires_at < NOW()
    `);

    for (const row of expired.rows) {

  const slot = await pool.query(
    `
    SELECT pitch_id
    FROM slots
    WHERE id = $1
    `,
    [row.slot_id]
  );

  await pool.query(
    `
    UPDATE slots
    SET status='AVAILABLE'
    WHERE id=$1
    `,
    [row.slot_id]
  );

  getIO()
    .to(slot.rows[0].pitch_id)
    .emit("slot-updated", {
      slotId: row.slot_id,
      status: "AVAILABLE",
    });
}

    await pool.query(`
      DELETE FROM reservations
      WHERE expires_at < NOW()
    `);

  } catch (error) {
    console.error(error);
  }
};