import express from "express"
import { sequelize } from "./database"

const app = express()

const PORT = process.env.PORT || 3000 // Se não tiver uma porta definida ir para a porta 3000

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('DB connection sucessfull')
    })
    console.log(`Server initilized in port ${PORT}`)
})