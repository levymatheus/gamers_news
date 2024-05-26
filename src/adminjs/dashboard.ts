import AdminJS, {PageHandler} from "adminjs"
import { Game, News, Category, User } from "../models"

export const dashboardOptions: {
    handler?: PageHandler
    component?:string
} = {
    component: AdminJS.bundle('./components/Dashboard'),
    handler: async (req, res, context) => {
        const games = await Game.count()
        const news = await News.count()
        const categories = await Category.count()
        const users = await User.count({ where: {role: 'user'}})

        res.json({
            'Categorias': categories,
            'Jogos Cadastrados': games,
            'Notícias até o momento': news,
            'Usuários cadastrados': users
        })
    }
}