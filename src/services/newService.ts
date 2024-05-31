import { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { WatchTimeAtt } from "../models/WatchTime"
import { WatchTime } from "../models/WatchTime"

export const newService = {
    streamNewToResponse: (res: Response, videoUrl: String, range: string | undefined) => {
        if (typeof videoUrl !== 'string') throw new Error("videoUrl não é do tipo string!")

        const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl)
        const fileStat = fs.statSync(filePath)


        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start, end })

            const head = {
                'Contente-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)

            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200, head)

            fs.createReadStream(filePath).pipe(res)
        }
    },

    getWatchTime: async (userId: number, newsId: number) => {
        const watchTime = await WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                newsId
            }
        })
        return watchTime
    },

    setWatchTime: async ({ userId, newsId, seconds }: WatchTimeAtt) => {
        const watchTimeAlreadyExists = await WatchTime.findOne({
            where: {
                userId,
                newsId
            }
        })

        if (watchTimeAlreadyExists) {
            watchTimeAlreadyExists.seconds = seconds
            await watchTimeAlreadyExists.save()
            return watchTimeAlreadyExists
        } else {
            const watchTime = await WatchTime.create({
                userId,
                newsId,
                seconds
            })
            return watchTime
        }
    }

}