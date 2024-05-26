import { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { newService } from "../services/newService"


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

    }
}