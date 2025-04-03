import express from "express";
import { addScore, getPlayerRank, getTop10Scores } from "./controller";

const router = express.Router();

/*  
POST /scores – Submit a new score (player_id, score, timestamp)
GET /scores?top=10 – Return top N scores
GET /scores/:player_id/rank – Return a specific player’s rank
 */

router.post("", addScore);
router.get("", getTop10Scores);
router.get("/:player_id/rank", getPlayerRank);

export default router;