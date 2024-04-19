import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Game {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

export interface GameCreationAttributes extends Optional<Game, 'id' | 'thumbnailUrl' | 'featured' > {}

export interface GameInstance extends Model<Game, GameCreationAttributes>, Game {}

export const Game = sequelize.define<GameInstance, Game>('Games', {
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
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})