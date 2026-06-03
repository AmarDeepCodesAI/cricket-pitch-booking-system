import { Router } from "express";
import { reserveSlot,confirmBooking, getMyBookings } from "../controllers/booking.controller";
import { authenticate }
from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/reserve",
  authenticate,
  reserveSlot
);
router.post(
  "/confirm",
  authenticate,
  confirmBooking
);

router.get(
  "/my",
  authenticate,
  getMyBookings
);

export default router;