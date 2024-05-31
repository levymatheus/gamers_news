import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { gamesController } from './controllers/gamesController'
import { newsController } from './controllers/newsController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'


export const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories',ensureAuth, categoriesController.index)
router.get('/categories/:id',ensureAuth, categoriesController.show)


router.get('/games/featured',ensureAuth, gamesController.featured)
router.get('/games/newest', gamesController.newest)
router.get('/games/popular', ensureAuth, gamesController.popular)
router.get('/games/search',ensureAuth, gamesController.search)
router.get('/games/:id',ensureAuth, gamesController.show)

router.get('/news/stream',ensureAuthViaQuery, newsController.stream)
router.get('/news/:id/watchTime', ensureAuth, newsController.getWatchTime)
router.post('/news/:id/watchTime', ensureAuth, newsController.setWatchTime)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites',ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)