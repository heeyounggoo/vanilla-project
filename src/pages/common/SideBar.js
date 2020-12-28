import Component from '@/core/component'

export default class SideBar extends Component {
  data () {
    return {
    }
  }

  template () {
    const requireAuthRoutes = this.$router.router.filter(route => route.meta.requireAuth)

    const routerLinkTemplate = requireAuthRoutes.map(router => {
      return `<li class="router-link__item"><a class="router-link__anchor" href="${router.path}">${router.name}</a></li>`
    }).join('')

    return `
      <nav class="sidebar">
        <div class="logo-container"></div>
        <div class="router">
          <ul class="router-link">${routerLinkTemplate}</ul>
        </div>
      </nav>
    `
  }

  created () {
    super.created()
    this.setEvent()
  }

  setEvent () {
    const target = this.$el.querySelector('.router')
    this.$router.registerEvent(target)
  }
}