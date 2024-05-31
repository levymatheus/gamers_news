import { Category } from "./Category"
import { Game } from "./Game"
import { News } from "./News"
import { Favorite } from "./Favorite"
import { User } from "./User"
import { Like } from "./Like"
import { WatchTime } from "./WatchTime"
// Pegamos alguns métodos do sequelize para fazer o relacionamento entre as tabelas
Category.hasMany(Game, {as: 'games'}) // uma categoria tem muitos jogos, então passamos o model de game para a categoria.
Game.belongsToMany(User, {through: Favorite})
Game.belongsToMany(User, {through: Like})
Game.belongsTo(Category) // um jogo pertence a uma categoria, então passamos o método belongsTo referenciando o model de categoria.
Game.hasMany(News, {as: 'news'}) // Um game tem várias notícias.
Game.hasMany(Favorite, {as: 'FavoritesUsers', foreignKey: 'game_id'})

News.belongsTo(Game) // Uma notícia pertence a um jogo.
News.belongsToMany(User, { through: WatchTime})

Favorite.belongsTo(Game)
Favorite.belongsTo(User)

User.belongsToMany(Game, {through: Favorite})
User.belongsToMany(Game, {through: Like})
User.belongsToMany(News, {through: WatchTime})
User.hasMany(Favorite, {as: 'FavoritesCourses', foreignKey: 'user_id'})

export  {
    Category,
    Game,
    News,
    Favorite,
    Like,
    User,
    WatchTime
}