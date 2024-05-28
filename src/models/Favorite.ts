import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { GameInstance } from "./Game";
import { UserInstance } from "./User";

export interface Favorite {
    userId: number
    gameId: number
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {
    Game?: GameInstance
    User?: UserInstance
}

export const Favorite = sequelize.define<FavoriteInstance, Favorite>('Favorite', {
    userId: {
        allowNull: false,
        primaryKey: true, 
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }, 
    gameId: {
        allowNull: false,
        primaryKey: true, 
        type: DataTypes.INTEGER,
        references: {
            model: 'games',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }


})
