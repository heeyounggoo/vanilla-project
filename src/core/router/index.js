import {
  generateRoutes,
  generateFlattenRoutes
} from '@/core/router/route'

import {
  getLocation,
  genFullPath
} from '@/core/router/path'


export default class Router {
  constructor (routes) {
    this.router = []
    this._flattenRouter = []
    this.current = null

    const handlePopState = () => {
      this.current = getLocation()
      const toRouter = this._flattenRouter.find(route => route.path === this.current.path)
      resolveComponent(toRouter)
    }

    window.addEventListener('popstate', handlePopState)
    this.addRoutes(routes)
  }

  push (to) {
    let toRouter = null

    if (typeof to === 'string') {
      toRouter = this._flattenRouter.find(route => route.name === to)
    } else {
      toRouter = this._flattenRouter.find(route => {
        return to.name ? route.name === to.name : to.path ? route.path === to.path : false
      })
    }

    resolveComponent(
      toRouter,
      {
        path: to.path || toRouter.path,
        query: to.query,
        hash: to.hash
      },
      this.pushState
    )
  }

  pushState (to) {
    let { query, hash, path } = to
    hash = /(#)/.test(hash) ? `#${hash}` : hash

    if (to) {
      window.history.pushState(
        null,
        '',
        genFullPath({ path: path, query: query, hash: hash })
      )
      // this.current = getLocation()
    }
  }

  addRoutes (routes) {
    const addRoutes = generateRoutes(routes)

    this.router = this.router.concat(addRoutes)
    this._flattenRouter = this._flattenRouter.concat(generateFlattenRoutes(addRoutes))
    this.current = getLocation()
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

function resolveComponent (route, to, callback) {
  if (!route) {
    console.error('[Router] Don`t have route')
    return false
  }

  const toPath = to || { path: route.path, query: route.query, hash: route.hash }

  importComponent(route)
    .then(() => {
      if (callback) callback(toPath)
    })
}

function importComponent (route) {
  return new Promise((resolve, reject) => {
    route.component()
      .then(data => {
        resolve(true)
        return new data.default({
          functional: true
        })
      })
      .catch((err) => reject(err))
  })
}