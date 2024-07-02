import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../config/environment'

export const sequelize = new Sequelize(DATABASE_URL,{
    define: {
        underscored: true // converte valores de propriedades do banco de dados em snake_case para camelCase que é o padrão do js
    }
})