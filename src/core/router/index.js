export default class Router {
  constructor (routes) {
    console.log('[Router in core]', routes)
    this.router = routes
  }

  push () {}

  pushState (route) {
    window.history.pushState(null, route.path, generatePath(route))
  }

  addRoutes (routes) {
    this.router = this.router.concat(routes)
  }

  registerEvent (target) {
    const targetEl = target || document

    const linkEl = targetEl.querySelectorAll('.router-link__anchor')
    Array.prototype.forEach.call(linkEl, el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target && e.target.attributes && e.target.attributes.href) {
          const routePath = e.target.attributes.href.value
          const toRouter = this.router.find(item => item.path === routePath)

          importComponent(toRouter)
            .then(() => this.pushState(toRouter))
        }
      })
    })
  }
}

function generatePath (route) {
  return `${window.location.origin}${route.path}`
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