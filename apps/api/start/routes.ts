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

import router from '@adonisjs/core/services/router'
import UsersController from '../app/Controllers/Http/UsersController.js'
import AuthController from '../app/Controllers/Http/AuthController.js'

router.get('/', async () => {
  return { hello: 'world' }
})

router.group(async () => {
  router.post('login', async (ctx) => {
    return new AuthController().login(ctx)
  })

  router.post('logout', async (ctx) => {
    return new AuthController().logout(ctx)
  })

  router.post('register', async (ctx) => {
    return new AuthController().register(ctx)
  })
}).prefix('auth')


router.group(async () => {
  router.get('/', async () => {
    return new UsersController().index()
  })

  router.get(':id', async (ctx) => {
    return new UsersController().show(ctx)
  })

  router.put(':id', async (ctx) => {
    return new UsersController().edit(ctx)
  })
}).prefix('users')
// .middleware(['auth'])


router.get('me', async (ctx) => {
  return new AuthController().getMe(ctx)
})
