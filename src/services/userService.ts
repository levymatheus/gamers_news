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

    },[] as NewsInstance[])

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

    getKeepWatchingList: async (id: number) => {
        const userWithWatchingNews = await User.findByPk(id, {
            include: {
                association: 'News',
                include: [{
                    association: 'Game'
                }],
                through: {
                    as: 'watchTime'
                }
            }
        })

        if (!userWithWatchingNews) throw new Error("Usuário não encontrado");
        

    }
}