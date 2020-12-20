export default class Router {
  constructor (router) {
    console.log('[Router in core]', router)
    this.router = router
    // this.render(router)
  }

  /*
  render (router, target) {
    const targetEl = document.querySelector(`.${target || 'router'}`)

    if (Array.isArray(router)) {
      const templateRouter = router.map(item => {
        return `<li class="router__item"><a class="router__item__link" href="/${item.name}">${item.name}</a></li>`
      }).join('')

      const routerEl = document.createElement('ul')
      routerEl.innerHTML = `<ul class="router--wrapper">${templateRouter}</ul>`

      targetEl.appendChild(routerEl)


      const linkEl = document.querySelectorAll('.router__item__link')
      Array.prototype.forEach.call(linkEl, (link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault() // 이벤트 버블링 막아야 404페이지로 리다이렉팅 안됨
          this.pushState(index)
        })
      })
    }
  }
  */

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