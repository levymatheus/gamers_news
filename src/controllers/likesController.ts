import { Response } from "express";
import { AuthenticationRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likesController = {
    // POST /likes
    save: async (req: AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
        const {gameId} = req.body

        try {
            const like = await likeService.like(userId, gameId)
            return res.status(201).json(like)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    delete: async (req: AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
        const gameId = req.params.id

        try {
            await likeService.unLike(userId, Number(gameId))
            return res.status(204).send()
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }


}