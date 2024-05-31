import { Like } from "../models"

export const likeService = { 
    like: async (userId: number, gameId: number) => {
        const like = await Like.create({
            userId,
            gameId
        })
        return like
    },

    unLike: async (userId: number, gameId: number) => {
        await Like.destroy({
            where: {
                userId,
                gameId
            }
        })
    }
}