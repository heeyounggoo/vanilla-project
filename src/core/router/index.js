export default class Router {
  constructor (router) {
    console.log('[Router in core]', router)
    this.router = router
  }

  push () {}

  pushState (index) {
    const currentRoute = this.router[index]
    window.history.pushState(null, `/${currentRoute.name}`, this.generatePath(currentRoute))
    this.router[index].component()
      .then((data) => {
        return new data.default()
      })
  }

  generatePath (router) {
    return `${window.location.origin}/${router.name}`
  }
}