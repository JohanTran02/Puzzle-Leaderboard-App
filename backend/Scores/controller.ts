import { Request, Response } from "express"
import { asyncErrorHandler } from "../Error/asyncErrorHandler"
import { CustomError } from "../Error/types"
import { IScores } from "./types";
import { Score } from "./model";

export const addScore = asyncErrorHandler(async (req: Request, res: Response) => {
    const createdScore = req.body as IScores;

    if ((!createdScore || (typeof createdScore.score === "string" || (typeof createdScore.score === null)))) throw new CustomError("Invalid query values", 400);

    const score = await Score.create(createdScore);

    res.status(200).json({
        status: "success",
        data: score
    })
});

type ScoreLimitQuery = {
    top?: string
}

export const getTop10Scores = asyncErrorHandler(async (req: Request<{}, {}, {}, ScoreLimitQuery>, res: Response) => {
    const limit: number = req.query.top ? parseInt(req.query.top) : 0;

    const scores = await Score.find().sort({ score: -1 }).limit(limit);

    res.status(200).json({
        status: "success",
        data: scores
    })
});

export const getPlayerRank = asyncErrorHandler(async (req: Request, res: Response) => {
    const player_id = req.params.player_id;
    const searchPlayer = await Score.findById(player_id);

    if (!searchPlayer) throw new CustomError("Player doesn't exist", 400);

    const scores = await Score.find().sort({ score: -1 });

    const playerRank = scores.findIndex((player) => player.id === player_id) + 1;

    res.status(200).json({
        status: "success",
        data: {
            rank: playerRank
        }
    })
});
