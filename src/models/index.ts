import { Category } from "./Category"
import { Game } from "./Game"

// Pegamos alguns métodos do sequelize para fazer o relacionamento entre as tabelas
Category.hasMany(Game) // uma categoria tem muitos jogos, então passamos o model de game para a categoria.
Game.belongsTo(Category) // um jogo pertence a uma categoria, então passamos o método belongsTo referenciando o model de categoria.

export  {
    Category,
    Game
}