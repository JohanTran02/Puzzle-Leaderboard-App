import { Schema, model } from "mongoose";
import { IScores } from "./types";

const scoreSchema = new Schema({
    player_id: { type: Schema.ObjectId },
    score: { type: Number },
    timestamp: { type: Date, default: Date.now }
})

export const Score = model<IScores>("Score", scoreSchema);