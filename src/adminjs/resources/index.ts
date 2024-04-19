import { ResourceWithOptions } from "adminjs";
import { Category, Game } from "../../models";
import { categoryResourceOptions } from "./category";
import { gameResourceOptions } from "./game";

export const adminJSResources: ResourceWithOptions[] = [
    {
        resource: Category, // Passamos o model de categorias
        options: categoryResourceOptions // as configurações de gerenciamento que definimos em category.js
    },

    {
        resource: Game, // O model de game
        options: gameResourceOptions // as configurações de gerenciamento de um jogo.
    }
]