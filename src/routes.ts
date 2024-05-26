import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { gamesController } from './controllers/gamesController'
import { newsController } from './controllers/newsController'
import { authController } from './controllers/authController'
import { ensureAuth } from './middlewares/auth'

export const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories',ensureAuth, categoriesController.index)
router.get('/categories/:id',ensureAuth, categoriesController.show)


router.get('/games/featured',ensureAuth, gamesController.featured)
router.get('/games/newest', gamesController.newest)
router.get('/games/search',ensureAuth, gamesController.search)
router.get('/games/:id',ensureAuth, gamesController.show)

router.get('/news/stream', newsController.stream)

