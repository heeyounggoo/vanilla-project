import Router from '@/core/router/index'

const router = new Router([
  {
    name: 'Api',
    component: () => import('@/pages/playground/Api.js')
  },
  {
    name: 'Assets',
    component: () => import('@/pages/playground/Assets.js')
  }
])