import {
  generateRoutes,
  generateFlattenRoutes,
  updateCurrentRoute
} from '@/core/router/util/route'

import {
  getLocation,
  genFullPath
} from '@/core/router/util/path'

import {
  importComponent
} from '@/core/router/util/resolveComponent'

import {
  hasOwnProperty
} from '@/core/util/util'

export default class Router {
  constructor (routes) {
    this._self = this
    this.router = [] // 전체 route - nested
    this._flattenRouter = [] // 전체 route - flatten
    this.route = null // current route
    this.current = null // current location

    const handlePopState = () => {
      this.current = getLocation()
      this.push(this.current, false)
    }

    this.addRoutes(routes)
    window.addEventListener('popstate', handlePopState)
  }

  async push (to, addState = true, callback) {
    /**
     * @desc
     * to: { name: '', path: '', query: '', hash: '' }, string(name)우
     * addState: pushState 로직 실행 여부, default: true
     * callback: 컴포넌트 로드 후 추가적으로 실행되야하는 콜백함수
     * push 이벤트 트리거되는 경우
     * - app.js 로드 후 라우터 링크 이벤트를 통해서 접근
     * - 새로그침, 직접 url 접근하여 fallback 로직을 통해서 실행
     * - history go/back으로 popstate 이벤트로 트리거되는 경
     */
    const toLocation = to ? typeof to === 'string' ? { name: to } : Object.assign({}, to) : getLocation()

    if (toLocation) {
      const toRoute = this._flattenRouter.find(route => {
        return hasOwnProperty(toLocation, 'name')
          ? route.name === toLocation.name
          : hasOwnProperty(toLocation, 'path')
            ? route.path === toLocation.path
            : false
      })

      if (!toRoute) return false
      await importComponent(toRoute)
      if (addState) {
        pushState.call(this, {
          path: toLocation.path,
          query: toLocation.query,
          hash: toLocation.hash
        })
      } else {
        updateCurrentRoute(this._self)
      }
      if (callback) await callback()
    }
  }

  addRoutes (routes) {
    const addRoutes = generateRoutes(routes)

    this.router = this.router.concat(addRoutes)
    this._flattenRouter = this._flattenRouter.concat(generateFlattenRoutes(addRoutes))
    updateCurrentRoute(this._self)
  }

  registerEvent (target) {
    const targetEl = target || document

    const linkEl = targetEl.querySelectorAll('.router-link__item__content')
    Array.prototype.forEach.call(linkEl, el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        routerLinkClickEvent.call(this, e)
      })
    })
  }
}

function routerLinkClickEvent (e) {
  if (e.target.attributes && e.target.attributes.href) {
    const toRouter = this._flattenRouter.find(route => route.path === e.target.attributes.href.value || route.meta.title === e.target.innerText)
    const to = {
      path: toRouter.path,
      query: null,
      hash: null
    }

    if (toRouter && toRouter.component) this.push(to)
    if (toRouter && !toRouter.component) {
      const target = e.path.find(node => [...node.classList].includes('router-link__item'))
      target.classList.toggle('router-link__item--active')
    }
  }
}

function pushState (to) {
  const history = window.history
  let { query, hash, path } = to
  hash = /(#)/.test(hash) ? `#${hash}` : hash

  if (to) {
    history.pushState(
      null,
      '',
      genFullPath({ path: path, query: query, hash: hash })
    )

    updateCurrentRoute(this._self)
  }
}
