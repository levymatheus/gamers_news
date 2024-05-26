import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, phone, birth } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)
            if (userAlreadyExists) {
                throw new Error("Um usuário com esse e-mail já está cadastrado!")
            }

            const createUser = await userService.create({
                firstName,
                lastName, 
                password,
                phone,
                email,
                birth,
                role: 'user'
            })

            return res.status(201).json(createUser)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}