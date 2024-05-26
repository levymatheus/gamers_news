import { Category } from "../models"

export const categoryService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage
        
        const { count, rows } = await Category.findAndCountAll({
            attributes: ['id', 'name', 'position'],
            order: [
                [
                    'position', 'ASC'
                ]
            ],
            limit: perPage,
            offset
        })
        
        return{
            categories: rows,
            page: page,
            perPage: perPage,
            total: count
        }
    },

    findByIdWithGames: async (id: string) => {
        const categoryWithGames = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'games', // nome da associação em index.ts na pasta models
                attributes: [
                    'id', 
                    'name', 
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })

        return categoryWithGames
    }
}