import { Category } from "./Category"
import { Game } from "./Game"
import { News } from "./News"
import { Favorite } from "./Favorite"
import { User } from "./User"
// Pegamos alguns métodos do sequelize para fazer o relacionamento entre as tabelas
Category.hasMany(Game, {as: 'games'}) // uma categoria tem muitos jogos, então passamos o model de game para a categoria.
Game.belongsToMany(User, {through: Favorite})

Game.belongsTo(Category) // um jogo pertence a uma categoria, então passamos o método belongsTo referenciando o model de categoria.
Game.hasMany(News, {as: 'news'}) // Um game tem várias notícias.
Game.hasMany(Favorite, {as: 'FavoritesUsers', foreignKey: 'game_id'})

News.belongsTo(Game) // Uma notícia pertence a um jogo.

Favorite.belongsTo(Game)
Favorite.belongsTo(User)

User.belongsToMany(Game, {through: Favorite})
User.hasMany(Favorite, {as: 'FavoritesCourses', foreignKey: 'user_id'})

export  {
    Category,
    Game,
    News,
    Favorite,
    User
}