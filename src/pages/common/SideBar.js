import Component from '@/core/components/component'

const SideBar = new Component({
  name: 'SideBar',
  data: {
    icon: {
      DashBoard: 'fas fa-desktop',
      ExpendIncome: 'fas fa-coins',
      Assets: 'fas fa-receipt'
    }
  },
  computed: {
    requiredRoutes () {
      return this.$router.router.filter(route => route.meta.requireAuth)
    }
  },
  template () {
    //language=HTML
    return `
      <nav class="sidebar">
        <div class="router-container">
          <ul class="router-link">
            <li for="route in requiredRoutes" class="router-link--root router-link__item">
              <i class="{{ icon[route.name] }} router-link__item__prepend-icon mr-2 icon"></i>
              <a href="{{ route.path || '#' }}" class="router-link__item__content {{ route.children ? 'has-children' : '' }}">{{ route.meta.title }}</a>
            </li>
          </ul>
        </div>
      </nav>
    `
  },

  mounted () {
    this.setEvent()
  },

  methods: {
    setEvent () {
      const target = this.$el.querySelector('.router-link')
      this.$router.registerEvent(target) // router-link__anchor 이벤트
    }
  }

})

export default SideBar
