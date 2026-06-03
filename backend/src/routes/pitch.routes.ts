import { Router } from "express";
import { getPitches,getSlotsByPitch } from "../controllers/pitch.controller";


const router = Router();

router.get("/", getPitches);
router.get("/:pitchId/slots", getSlotsByPitch);

export default router;