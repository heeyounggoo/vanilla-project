import { hasOwnProperty } from '@/core/util/util'
import {getLocation} from "@/core/router/util/path";

const ROUTE = {
  name: '',
  path: '',
  hash: '',
  query: null,
  component: null,
  meta: null
}

function setLoadComponentFunc (route) {
  /**
   * @desc 이름으로 넘어온 컴포넌트 실제 컴포넌트 로드하는 로직으로 셋
   * 아래 방식은 컴포넌트 네임이 유일하다는 가정아래 작성
   */
  const requireRouteCompPath = require.context('../../../pages', true, /\.js$/)
  const targetRouteCompPath = requireRouteCompPath.keys().find(item => {
    const lastPathName = item.split('/').slice(-1)[0] // path 중 가장 마지막 경로
    return lastPathName === `${route.name}.js`
  })
  const loadComponent = () => import(`@/pages${targetRouteCompPath.replace(/(.)/, '')}`)

  return targetRouteCompPath ? loadComponent : null
}

function generatePath (route, parentPath) {
  /**
   * @desc 자식 라우터들 존재하는 경우 부모 라우터랑 합쳐 url 생성
   */
  return parentPath ? `${parentPath.path}${route.path}` : route.path
}

function generateRoute (route, parentRoute) {
  /**
   * @desc 라우터 인스턴스로 넘오온 배열 실제 라우터에 맞게 가공(자식 라우터 포함)
   * 1. 컴포넌트: string > 컴포넌트 로드하는 로직으로 대체
   * 2. path: 자식 라우터인 경우 부모 라우터 받아서 신규 path 생성
   */
  const assignRoutes = {
    component: setLoadComponentFunc(route),
    path: generatePath(route, parentRoute)
  }

  if (route.children && route.children.length > 0) {
    assignRoutes.children = route.children.map(child => generateRoute(child, route))
  }

  return Object.assign({}, route, assignRoutes)
}

function generateRoutes (routes) {
  return routes.map(route => {
    return generateRoute(route)
  })
}

function generateFlattenRoute (route) {
  const assignRoute = Object.assign({}, ROUTE)
  Object.keys(assignRoute).forEach(key => {
    if (hasOwnProperty(route, key)) {
      assignRoute[key] = route[key]
    }
  })

  return assignRoute
}

function generateFlattenRoutes (routes) {
  return routes.reduce((flattenRoutes, route) => {
    flattenRoutes.push(generateFlattenRoute(route))

    if (route.children && route.children.length > 0) {
      route.children.forEach(child => {
        flattenRoutes.push(generateFlattenRoute(child))
      })
    }

    return flattenRoutes
  }, [])
}

function updateCurrentRoute (self) {
  self.current = getLocation()
  self.route = self._flattenRouter.find(item => item.path === self.current.path)
}

export {
  generateRoutes,
  generateFlattenRoutes,
  updateCurrentRoute
}