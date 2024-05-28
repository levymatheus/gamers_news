import { Response } from "express";
import { AuthenticationRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {

    // GET /favorites 

    index: async (req:AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
       try {
        const favorites = await favoriteService.fyndByUserId(userId)
        return res.json(favorites)
       } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }
       }
    },

    // POST /favorites 
    save: async (req: AuthenticationRequest, res: Response) => {
        const userId = req.user!.id
        const { gameId } = req.body

        try {
            const favorite = await favoriteService.create(userId, gameId)
            return res.status(201).json(favorite)
            
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}