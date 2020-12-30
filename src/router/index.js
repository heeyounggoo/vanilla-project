import Router from '@/core/router/index'
import { defaultRouter, routes } from '@/router/path'


const router = new Router(defaultRouter)
router.addRoutes(routes)

export default router