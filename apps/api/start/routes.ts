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

import Route from '@ioc:Adonis/Core/Route'
import UsersController from '../app/Controllers/Http/UsersController'
import AuthController from '../app/Controllers/Http/AuthController'
import ProfilesController from 'App/Controllers/Http/ProfilesController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(async () => {
  Route.get('/', async () => {
    return new UsersController().index()
  })

  Route.get(':id', async (ctx) => {
    return new UsersController().show(ctx)
  })

  Route.put('/:id/profile', async (ctx) => {
    return new UsersController().updateUserProfile(ctx)
  })
}).prefix('users')
// .middleware(['auth'])

Route.group(async () => {
  Route.post('login', async (ctx) => {
    return new AuthController().login(ctx)
  })

  Route.post('logout', async (ctx) => {
    return new AuthController().logout(ctx)
  })

  Route.post('register', async (ctx) => {
    return new AuthController().register(ctx)
  })
}).prefix('auth')

Route.get('me', async (ctx) => {
  return new AuthController().getMe(ctx)
})

Route.get('profiles/:id', async ({ params }) => {
  return new ProfilesController().show(params.id)
})

Route.put('profiles/:id', async (ctx) => {
  return new ProfilesController().update(ctx)
})
