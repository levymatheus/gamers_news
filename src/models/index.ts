import { Category } from "./Category"
import { Game } from "./Game"
import { News } from "./News"
import { User } from "./User"
// Pegamos alguns métodos do sequelize para fazer o relacionamento entre as tabelas
Category.hasMany(Game, {as: 'games'}) // uma categoria tem muitos jogos, então passamos o model de game para a categoria.
Game.belongsTo(Category) // um jogo pertence a uma categoria, então passamos o método belongsTo referenciando o model de categoria.
Game.hasMany(News, {as: 'news'}) // Um game tem várias notícias.
News.belongsTo(Game) // Uma notícia pertence a um jogo.

export  {
    Category,
    Game,
    News,
    User
}