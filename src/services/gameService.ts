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

    getTopFiveByLikes: async () => {
        const result = await Game.sequelize?.query(
            `SELECT
                games.id,
                games.name,
                games.synopsis,
                games.thumbnail_url AS thumbnailUrl,
                COUNT(users.id) AS likes
            FROM games
                LEFT OUTER JOIN likes
                    ON games.id = likes.games_id
                    INNER JOIN users
                        ON users.id - likes.user_id
            GROUP BY games_id
            ORDER BY likes DESC    
            LIMIT 5;  
            `
        )

        if (result) {
            const [topFive] = result
            return topFive
        } else {
            return null
        }

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