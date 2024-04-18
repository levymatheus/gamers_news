import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

// O model é como vamos interagir com a tabela dentro da aplicação. 
export interface Category { // a interface diz para a aplicação como é o formato e tipos das nossas categorias, presentes no banco de dados.
    id: number
    name: string
    position: number
}

// Os atributos de crição de uma categoria no banco de dados: Nesse caso o próprio BD cria com o id, ou cria um id que não existe.
export interface CategoryCreationAttributes extends Optional<Category, 'id'>{}

// Instância de uma categoria: Possui todos os métodos e propriedades do sequelize
export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {} // Deixa a tipagem mais rigorosa.

// Cria o model na instância do sequelize
export const Category = sequelize.define<CategoryInstance, Category>('Category', { // define o modelo da interface Category e os métodos.
        id: {
          allowNull: false, // Campos obrigatórios 
          autoIncrement: true, // Gerar o ID automaticamente a cada registro criado
          primaryKey: true, // o ID vai ser a chave primária no banco de dados
          type: DataTypes.INTEGER // O tipo do dado: Inteiro
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        position: { // Ordenar as categorias em uma ordem: suposição 
          allowNull: false,
          type: DataTypes.INTEGER
        }
}) // Contexto da aplicação