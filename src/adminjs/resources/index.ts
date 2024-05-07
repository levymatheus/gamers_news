import { ResourceWithOptions } from "adminjs";
import { Category, Game, News, User } from "../../models";
import { categoryResourceOptions } from "./category";
import { gameResourceFeatures, gameResourceOptions } from "./game";
import {newsResourceOptions } from "./new";
import { newsResourceFeaturesVideo, newsResourceFeaturesImage } from "./new";
import { userResourceOptions } from "./user";

export const adminJSResources: ResourceWithOptions[] = [
    {
        resource: Category, // Passamos o model de categorias
        options: categoryResourceOptions // as configurações de gerenciamento que definimos em category.js
    },

    {
        resource: Game, // O model de game
        options: gameResourceOptions, // as configurações de gerenciamento de um jogo.
        features: gameResourceFeatures
    },
    
    {
        resource: News,
        options: newsResourceOptions, 
        features: [...newsResourceFeaturesVideo, ...newsResourceFeaturesImage]
    },

    {
        resource: User,
        options: userResourceOptions
    }
]