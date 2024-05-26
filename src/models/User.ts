import { Optional, Model, DataTypes } from "sequelize"
import { sequelize } from "../database"
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void



export interface User {
    id: number
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
    role: 'admin' | 'user' // O usuário só pode ser admin ou user
}



export interface UserCreationAttributes extends Optional<User, 'id'> { }


export interface UserInstance extends Model<User, UserCreationAttributes>, User {
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void

}


export const User = sequelize.define<UserInstance, User>('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true, // Não podemos ter emails duplicados
        type: DataTypes.STRING,
        validate: {
            isEmail: true // Garante que no input do front-end vai ser passado um email válido ex: email@email.com
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['admin', 'user']] // valida se a role é um admin ou string, não pode ser algo diferente disso
        }
    }
    // vamos criptografar as senhas: instalando o npm install bcrypt@ e tipagem npm install -D @types/bcrypt
},
    // vamos criptografar as senhas: instalando o npm install bcrypt@ e tipagem npm install -D @types/bcrypt

    {
        hooks: {
            beforeSave: async (user) => {
                if (user.isNewRecord || user.changed('password')) {
                    user.password = await bcrypt.hash(user.password.toString(), 10)
                }
            } // executa antes do registro ir para o BD
        }
    })


    User.prototype.checkPassword = function (password: string, callbackfn: CheckPasswordCallback) {
        bcrypt.compare(password, this.password, (err, isSame) => {
            if (err) {
                callbackfn(err, false)
            } else {
                callbackfn(err, isSame)
            }
        })
    }