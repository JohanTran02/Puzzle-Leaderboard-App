import mongoose, { Schema, model } from "mongoose";
import { IScores } from "./types";

const scoreSchema = new Schema({
    player_id: { type: mongoose.Schema.Types.ObjectId },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
})

export const Score = model<IScores>("Score", scoreSchema);