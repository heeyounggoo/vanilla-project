import Component from '@/core/component'

export default class SideBar extends Component {
  data () {
    return {
      icon: {
        DashBoard: 'fas fa-desktop',
        ExpendIncome: 'fas fa-coins',
        Assets: 'fas fa-receipt'
      }
    }
  }

  template () {
    const requireAuthRoutes = this.$router.router.filter(route => route.meta.requireAuth)
    const childrenTemplate = (routes) => { // children routes 존재하는 경우 template 생성
      const routerTemplate = routes.map(route => {
        return `
          <li class="router-link__item router-link--children__item flex align-center">
            <a href="${route.path || '#'}" class="router-link__item__content">${route.meta.title}</a>
          </li>
        `
      }).join('')

      return `
        <div class="router-link--children">
          <ul class="router-link--children__container">${routerTemplate}</ul>
        </div>
      `
    }

    const routerTemplate = requireAuthRoutes.map(route => {
      return `
        <li class="router-link--root router-link__item">
          <div class="router-link--root__item flex align-center">
            <i class="${this.icon[route.name]} router-link__item__prepend-icon mr-2"></i>
            <a href="${route.path || '#'}" class="router-link__item__content ${route.children ? 'has-children' : ''}">${route.meta.title}</a>
            ${route.children ? '<i class="fas fa-chevron-down router-link__item__append-icon ml-2 mr-2"></i>' : ''}
          </div>
          ${route.children ? childrenTemplate(route.children) : ''}
        </li>
      `
    }).join('')

    return `
      <nav class="sidebar">
        <div class="logo-container"></div>
        <div class="router-container">
          <ul class="router-link">${routerTemplate}</ul>
        </div>
      </nav>
    `
  }

  mounted () {
    super.mounted()
    this.setEvent()
  }

  setEvent () {
    const target = this.$el.querySelector('.router-link')
    this.$router.registerEvent(target) // router-link__anchor 이벤트
  }
}