/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import PortfolioImagesController from '#controllers/portfolio_images_controller'
import PortfolioFoldersController from '#controllers/portfolio_folders_controller'
import CategoriesController from '#controllers/categories_controller'
import { middleware } from '#start/kernel'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/', async () => {
  return { hello: 'world' }
})

router.group(async () => {
  router.post('login', [AuthController, 'login'])
  router.post('logout', [AuthController, 'logout'])
  router.post('register', [AuthController, 'register'])
  router.get('me', [AuthController, 'getMe'])
}).prefix('auth')


router.group(async () => {
  router.get('/', [UsersController, 'index'])
  router.get(':id', [UsersController, 'show'])
  router.put(':id', [UsersController, 'edit'])
  router.post(':id/avatar', [UsersController, 'uploadUserAvatar'])

  router.group(async () => {
    router.group(async () => {
      router.get('/', [PortfolioImagesController, 'index'])
      router.get(':portfolioImageId', [PortfolioImagesController, 'show'])
      router.post('/', [PortfolioImagesController, 'store'])
      router.delete(':portfolioImageId', [PortfolioImagesController, 'destroy'])
      router.post(':portfolioImageId/illustration', [PortfolioImagesController, 'setIsIllustration'])
    }).prefix('images')

    router.group(async () => {
      router.get('/', [PortfolioFoldersController, 'index'])
      router.post('/', [PortfolioFoldersController, 'store'])
      router.delete(':portfolioFolderId', [PortfolioFoldersController, 'destroy'])
    }).prefix('folders')

    router.post('enable', [UsersController, 'enablePortfolio'])
    router.get('illustration', [UsersController, 'getPortfolioIllustration'])
  }).prefix(':userId/portfolio')
}).prefix('users')

router.group(async () => {
  router.post('enable', [UsersController, 'enablePortfolio'])
  router.get('illustration', [UsersController, 'getPortfolioIllustration'])
})
.prefix('portfolio')
.use(middleware.auth({ guards: ['api'] }))


router.group(async () => {
  router.get('/', [UsersController, 'showBookmarks'])
  router.post(':creativeId', [UsersController, 'addBookmark'])
  router.delete(':creativeId', [UsersController, 'removeBookmark'])
})
.prefix('bookmarks')
.use(middleware.auth({ guards: ['api'] }))

router.resource('categories', CategoriesController).apiOnly()

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)
  
  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }
  
  const absolutePath = app.makePath('tmp','uploads', normalizedPath)
  return response.download(absolutePath)
})
