import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJSResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

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
    saveUninitialized: false
}
) // rotas para o servidor, basicamente comunica o express com o adminjs