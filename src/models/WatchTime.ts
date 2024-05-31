import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"


export interface WatchTimeAtt {
  seconds: number
  userId: number
  newsId: number
}

export interface WatchTimeInstance extends Model<WatchTimeAtt>, WatchTimeAtt { }

export const WatchTime = sequelize.define<WatchTimeInstance, WatchTimeAtt>('WatchTime', {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  newsId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: 'news', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})