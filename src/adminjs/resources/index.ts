import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models";
import { categoryResourceOptions } from "./category";

export const adminJSResources: ResourceWithOptions[] = [
    {
        resource: Category, // Passamos o model de categorias
        options: categoryResourceOptions // as configurações de gerenciamento que definimos em category.js
    }
]