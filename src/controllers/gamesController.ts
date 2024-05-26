import { Request, Response } from "express"
import { gameService } from "../services/gameService"
import { getPaginationParams } from "../helpers/getPaginatedParams"

export const gamesController = {

    // GET /games/featured
    featured: async (req: Request, res: Response) => {
        try {
            const featuredGames = await gameService.getRandomFeaturedGames()
            return res.json(featuredGames)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // GET /games/newest
    newest: async (req: Request, res: Response) => {
        try {
            const newestGame = await gameService.getTopFiveNewest()
            return res.json(newestGame)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    // GET /games/search?name=

    search: async (req: Request, res: Response) => {
        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if (typeof name !== 'string') throw new Error('name no type string')
            const game = await gameService.findByName(name, page, perPage)
            return res.json(game)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // GET /games/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const game = await gameService.findByIdWithNews(id)
            return res.json(game)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}