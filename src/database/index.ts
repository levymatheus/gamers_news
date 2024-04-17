import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gamersNews_development',
    username:'gamersnews',
    password: 'gamersnews',
    define: {
        underscored: true // converte valores de propriedades do banco de dados em snake_case para camelCase que é o padrão do js
    }
})