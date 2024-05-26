import { Op } from "sequelize"
import { Game } from "../models"

export const gameService = {
    findByIdWithNews: async (id: string) => {
        const gameWithNews = await Game.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            include: {
                association: 'news',
                attributes: [
                    'id',
                    'name',
                    'textNews',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['image_url', 'imageUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        })
        return gameWithNews
    },
    getRandomFeaturedGames: async () => {
        const featuredGames = await Game.findAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                featured: true
            }
        })
        const randomFeaturedGames = featuredGames.sort(() => 0.5 - Math.random())
        return randomFeaturedGames.slice(0, 3)
    },

    getTopFiveNewest: async () => {
        const games = await Game.findAll({
            limit: 5,
            order: [['created_at', 'DESC']]
        })

        return games
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage
        const {count, rows } = await Game.findAndCountAll({

            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: perPage,
            offset
        })

        return {
            games: rows,
            page,
            perPage,
            total: count
        }
    }

}