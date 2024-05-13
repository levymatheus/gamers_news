import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJSResources } from "./resources";
import { Category, Game, News, User } from "../models";
import bcrypt from "bcrypt"
import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJS = new AdminJS({
    databases: [sequelize], 
    rootPath: "/admin", // http://localhost:3000/admin
    resources: adminJSResources,
    branding: {
        companyName: 'Gamer News Administrator',
       logo: '/logoApp.png',
        softwareBrothers: false,
        theme: {
            colors: {
                primary100: '#02012d',
                primary80: '#03023f',
                primary60: '#04034f',
                primary40: '#050461',
                primary20: '#060673',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#0a0a73',
                hoverBg: '#0c0c85',
                border: '#0e0e96',
                highlight: '#1010a8',
                success: '#28a745',
                error: '#dc3545',
                info: '#ffc107',
                
    
            }
        }
    },
    locale: locale,
    dashboard: {
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

})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (email, password) => {
        const user = await User.findOne({where: {email} }) 

        if (user && user.role === 'admin') {
            const matched = await bcrypt.compare(password, user.password)

            if(matched) {
                return user
            }
        }

        return false 
    },

    cookiePassword: 'senha-de-cookie'
}, null, {
    resave: false, 
    saveUninitialized: false
}
) // rotas para o servidor, basicamente comunica o express com o adminjs