import { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { newService } from "../services/newService"
import { AuthenticationRequest } from "../middlewares/auth"


export const newsController = {
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error("videoUrl não é do tipo string!")
                const range = req.headers.range

            newService.streamNewToResponse(res, videoUrl, range)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }

    },

    getWatchTime: async (req: AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
        const newsId = req.params.id
        try {
            const watchTime = await newService.getWatchTime(userId, Number(newsId))
            return res.json(watchTime)
            
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    setWatchTime: async (req: AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
        const newsId = Number(req.params.id)
        const {seconds} = req.body

        try {
            const watchTime = await newService.setWatchTime({
                newsId,
                userId,
                seconds

            })
            return res.json(watchTime)
            
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}