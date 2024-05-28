import { Favorite } from "../models"

export const favoriteService = {
    
    fyndByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
            attributes: [["user_id", "userId"]],
            where: {userId},
            include: {
                association: 'Game',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })
        return {
            userId, 
            games: favorites.map(favorite => favorite.Game)
            
        }
    },
    
    create: async (userId: number, gameId: number) => {
        const favorite = await Favorite.create({
           userId,
           gameId
        })
        return favorite
    },
}