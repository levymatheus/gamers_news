import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { GameInstance } from "./Game";
import { UserInstance } from "./User";

export interface Like {
    userId: number
    gameId: number
}

export interface LikeInstance extends Model<Like>, Like {
    Game?: GameInstance
    User?: UserInstance
}

export const Like = sequelize.define<LikeInstance, Like>('Like', {
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
