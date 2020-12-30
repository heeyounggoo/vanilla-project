const defaultRouter = [
  // {
  //   name: '',
  //   path: '/',
  //   meta: {
  //     title: '',
  //     requireAuth: false
  //   }
  // },
  {
    name: 'Api',
    path: '/playground/api',
    meta: {
      title: 'Api',
      requireAuth: false
    }
  },
  {
    name: 'UiAssets',
    path: '/playground/assets',
    meta: {
      title: 'Api',
      requireAuth: false
    }
  }
]

/** @desc menu list payload example
 * name: 메뉴 명칭
 * order: 메뉴 노출 순서
 * parent_id: 부모 뎁스 아이디
 * menu_id: 메뉴 고유 아이디
 * component: 컴포넌트 명
 * */
const routes = [
  {
    name: 'DashBoard',
    order: 1,
    parent_id: null,
    menu_id: 1,
    path: '/dashboard',
    meta: {
      title: '대시보드',
      requireAuth: true
    }
  },
  {
    name: 'ExpendIncome',
    order: 2,
    parent_id: null,
    menu_id: 2,
    path: '/expend-income',
    meta: {
      title: '수입/지출',
      requireAuth: true
    }
  },
  {
    name: 'Assets',
    order: 3,
    parent_id: null,
    menu_id: 3,
    path: '/assets',
    meta: {
      title: '예산/자산',
      requireAuth: true
    },
    children: [
      {
        name: 'SavingDeposit',
        order: 1,
        parent_id: 3,
        menu_id: 31,
        path: '/saving-deposit',
        meta: {
          title: '적금/예금',
          requireAuth: true
        }
      },
      {
        name: 'Budget',
        order: 2,
        parent_id: 3,
        menu_id: 32,
        path: '/budget',
        meta: {
          title: '예산설정',
          requireAuth: true
        }
      }
    ]
  }
]

export { defaultRouter, routes }
