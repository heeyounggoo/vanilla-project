import Component from '@/core/component'

export default class SideBar extends Component {
  data () {
    return {
    }
  }

  template () {
    return `
      <aside class="router"></aside>
    `
  }

  created () {
    super.created()
    this.renderMenuRoutes()
  }

  renderMenuRoutes () {
    const targetEl = document.querySelector('.router')

    if (Array.isArray(this.$router.router)) {
      const templateRouter = this.$router.router.map(item => {
        return `<li class="router-link__item"><a class="router-link__anchor" href="/${item.name}">${item.name}</a></li>`
      }).join('')

      const routerEl = document.createElement('ul')
      routerEl.className = 'router-link'
      routerEl.innerHTML = templateRouter

      targetEl.appendChild(routerEl)


      const linkEl = document.querySelectorAll('.router-link__item')
      Array.prototype.forEach.call(linkEl, (link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault() // 이벤트 버블링 막아야 404페이지로 리다이렉팅 안됨
          this.$router.pushState(index)
        })
      })
    }
  }
}