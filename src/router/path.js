const defaultRouter = [
  {
    name: 'Api',
    path: '/playground/api',
    meta: {
      title: 'Api',
      requireAuth: false
    },
    component: () => import('@/pages/playground/Api.js')
  },
  {
    name: 'Assets',
    path: '/playground/assets',
    meta: {
      title: 'Api',
      requireAuth: false
    },
    component: () => import('@/pages/playground/Assets.js')
  }
]

/** @desc menu list payload example
 * name: 메뉴 명칭
 * order: 메뉴 노출 순서
 * id: 부모 뎁스 아이디
 * menu_id: 메뉴 고유 아이디
 * component: 컴포넌트 명
 * */
const routes = [
  {
    name: '대시보드',
    order: 1,
    parent_id: 0,
    menu_id: 1,
    path: '/dashboard',
    meta: {
      title: '대시보드',
      requireAuth: true
    },
    component: 'DashBoard'
  },
  {
    name: '예산설정',
    order: 2,
    parent_id: 3,
    menu_id: 32,
    path: '/assets/budget',
    meta: {
      title: '예산설정',
      requireAuth: true
    },
    component: 'Budget'
  },
  {
    name: '수입/지출',
    order: 2,
    parent_id: 0,
    menu_id: 2,
    path: '/expend-income',
    meta: {
      title: '수입/지출',
      requireAuth: true
    },
    component: 'ExpendIncome'
  },
  {
    name: '예산/자산',
    order: 3,
    parent_id: 0,
    menu_id: 3,
    path: null,
    meta: {
      title: '예산/자산',
      requireAuth: true
    },
    component: 'Assets'
  },
  {
    name: '적금/예금',
    order: 1,
    parent_id: 3,
    menu_id: 31,
    path: '/assets/saving-deposit',
    meta: {
      title: '적금/예금',
      requireAuth: true
    },
    component: 'SavingDeposit'
  }
]

function setComponents (routes ) {
  return routes.reduce((acc, cur) => {
    if (cur.children.length > 0) {
      cur.children.map(child => {
        child.component = findComponentPath(child)
        return child
      })
    }

    cur.component = findComponentPath(cur)
    acc.push(cur)

    return acc
  }, [])
}

function findComponentPath (route) {
  const requireRouteCompPath = require.context('../pages', true, /\.js$/)
  const targetRouteCompPath = requireRouteCompPath.keys().find(item => item.includes(route.component))
  const loadComponent = () => import(`@/pages${targetRouteCompPath.replace(/(.)/, '')}`)

  return targetRouteCompPath && route.path ? loadComponent : null
}

export function generateRoutes (routes) {
  const parentRoutes = routes
    .filter(item => item.parent_id === 0)
    .map(parent => {
      parent.children = routes.filter(child => child.parent_id === parent.menu_id)
      return parent
    })

  return setComponents(parentRoutes).sort((a, b) => a.order - b.order)
}

export { defaultRouter, routes }
