import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
  () => import('#middleware/initialize_bouncer_middleware'),
  () => import('@adonisjs/cors/cors_middleware')
])

server.use([
  () => import('@adonisjs/cors/cors_middleware')
])

export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})
