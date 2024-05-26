import express from "express"
import { sequelize } from "./database"
import { adminJS, adminJsRouter } from "./adminjs"
import { router } from "./routes"

const app = express()

app.use(express.static('public')) // mostrando para o servidor a pasta dos assets publicos

app.use(express.json())

app.use(adminJS.options.rootPath, adminJsRouter) // rotas para o adminJs trabalhar com o servidor express
app.use(router)

const PORT = process.env.PORT || 3000 // Se não tiver uma porta definida ir para a porta 3000

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('DB connection sucessfull')
    })
    console.log(`Server initilized in port ${PORT}`)
})