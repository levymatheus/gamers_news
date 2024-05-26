import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { gamesController } from './controllers/gamesController'
import { newsController } from './controllers/newsController'
import { authController } from './controllers/authController'

export const router = express.Router()

router.post('/auth/register', authController.register)

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)


router.get('/games/featured', gamesController.featured)
router.get('/games/newest', gamesController.newest)
router.get('/games/search', gamesController.search)
router.get('/games/:id', gamesController.show)

router.get('/news/stream', newsController.stream)

