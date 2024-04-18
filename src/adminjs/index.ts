import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJSResources } from "./resources";

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
    }

})

export const adminJsRouter = AdminJSExpress.buildRouter(adminJS) // rotas para o servidor, basicamente comunica o express com o adminjs