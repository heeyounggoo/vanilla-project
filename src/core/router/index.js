export default class Router {
  constructor (router) {
    console.log('[Router in core]', router)
    this.router = router
  }

  push () {}

  pushState (router) {
    window.history.pushState(null, `/${router.name}`, generatePath(router))
  }

  registerEvent (target) {
    const targetEl = target || document

    const linkEl = targetEl.querySelectorAll('.router-link__anchor')
    Array.prototype.forEach.call(linkEl, el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target && e.target.attributes && e.target.attributes.href) {
          const routerName = e.target.attributes.href.value.replace(/(\/)/, '')
          const toRouter = this.router.find(item => item.name === routerName)

          importComponent(toRouter)
            .then(() => this.pushState(toRouter))
        }
      })
    })
  }
}

function generatePath (router) {
  return `${window.location.origin}/${router.name}`
}

function importComponent (router) {
  return new Promise((resolve, reject) => {
    router.component()
      .then(data => {
        resolve(true)
        return new data.default({
          functional: true
        })
      })
      .catch((err) => reject(err))
  })
}