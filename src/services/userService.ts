import { Response } from "express"
import { AuthenticationRequest } from "../middlewares/auth"
import { User } from "../models"
import { NewsInstance } from "../models/News"
import { UserCreationAttributes } from "../models/User"

function filterLastNewsByGames(news: NewsInstance[]) {
    const gamesOnList: number[] = []

    const lastNews = news.reduce((currentList, news) => {
        if (!gamesOnList.includes(news.gameId)) {
            gamesOnList.push(news.gameId)
            currentList.push(news)
            return currentList
        }
        const newFromSameGame = currentList.find(nw => nw.gameId === news.gameId)

        if (newFromSameGame!.order > news.order) return currentList

        const listWitchoutNewFromSameGame = currentList.filter(nw => nw.gameId !== news.gameId)
        listWitchoutNewFromSameGame.push(news)
        return listWitchoutNewFromSameGame

    }, [] as NewsInstance[])

    return lastNews
}

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email
            }
        })
        return user
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    },

    update: async (id: number, attributes: {
        firstName: string,
        lastName: string,
        phone: string, 
        birth: Date,
        email: string
    }) => {
        const [affectedRows, updatedUsers] = await User.update(attributes, {where: { id }, returning: true})
        updatedUsers[0]
    },

    getKeepWatchingList: async (id: number) => {
        const userWithWatchingNews = await User.findByPk(id, {
            include: {
                association: 'News',
                attributes: [
                    'id',
                    'name',
                    'textNews',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['game_id', 'gameId']
                ],
                include: [{
                    association: 'Game',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ],
                    as: 'game'
                }],
                through: {
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        })

        if (!userWithWatchingNews) throw new Error("Usuário não encontrado");

        const keepWatchingList = filterLastNewsByGames(userWithWatchingNews.News!)
        // @ts-ignore
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updateAt ? 1 :-1)
        return keepWatchingList
    }
}