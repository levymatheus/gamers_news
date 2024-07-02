import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJSResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
import session from "express-session"
import connectSession from "connect-session-sequelize"
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({db: sequelize})
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJS = new AdminJS({
    databases: [sequelize], 
    rootPath: "/admin", // http://localhost:3000/admin
    resources: adminJSResources,
    branding: brandingOptions,
    locale: locale,
    dashboard: dashboardOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS,
    authenticationOptions , 
    null, 
{
    resave: false, 
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD
}
) // rotas para o servidor, basicamente comunica o express com o adminjs