import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginationParams } from "../helpers/getPaginatedParams";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        const [ page, perPage ] = getPaginationParams(req.query)

        try {
          const paginatedCategories =  await categoryService.findAllPaginated(page, perPage)

          return res.json(paginatedCategories)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }, 

    // GET /categories/:id 

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await categoryService.findByIdWithGames(id)
            return res.json(category)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            } 
        }
    }
}





/*
import { categoryService } from "../services/categoryService";
import { getPaginationParams } from "../helpers/getPaginationParams";

// aqui iremos controlar a nossa rota de categorias
export const categoriesController = {
    // GET / categories
    // rotas com o express precisamos do caminho dessa rota e de uma função de callback
    index: async (req: Request, res: Response) => {
        const [page, perPage] = getPaginationParams(req.query)
        // criamos o try catch para evitar comportamentos inesperados na nossa API e caso tenha erro retornar algo no front do usuário
        try {
            const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
            return res.json(paginatedCategories)
        } catch (err) { // caso tenha um erro na requisição 
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message }) // retornamos o erro 400 com uma mensagem para o usuário no front-end 
            }
        }

    },
    // GET /categories /:id parâmetros da própria rota url que o express vai mapear
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await categoryService.findByIdWithCourses(id)
            return res.json(category)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}*/