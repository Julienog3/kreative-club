import router from '@adonisjs/core/services/router'

router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
  () => import('#middleware/initialize_bouncer_middleware')
])

export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})
