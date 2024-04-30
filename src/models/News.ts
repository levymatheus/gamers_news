import {  DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

export interface News {
    id: number
    name: string
    textNews: string
    order: number
    videoUrl: string
    imageUrl: string
    secondsLong: number
    gameId: number

}

export interface NewsCreationAttributes extends Optional<News, 'id' | 'videoUrl' | 'imageUrl' | 'secondsLong' > {}

export interface NewsInstance extends Model<News, NewsCreationAttributes>, News {}

export const News = sequelize.define<NewsInstance, News>('News', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    textNews: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    order: {
        allowNull: false,
        type: DataTypes.STRING
    },
    videoUrl: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    secondsLong: {
        type: DataTypes.INTEGER
    },
    gameId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {model: 'games', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})