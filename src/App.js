import Component from '@/core/component'
// import Store from '@/core/store/store'
import router from '@/router/index'
import { routes, generateRoutes } from '@/router/path'
import SideBar from '@/pages/common/SideBar'
import TopBar from '@/pages/common/TopBar'
import install from '@/mixins/install'
import '@/assets/style/global.scss'

const App = class App extends Component {
  data () {
    return {
      components: { SideBar, TopBar }
    }
  }

  template () {
    return `
    <div class="container">
      <div class="TopBar"></div>
      <div class="SideBar"></div>
      <main class="main">
        <div class="page pa-5">
          <div class="RouterView pa-5"></div>
        </div>
      </main>
    </div>
    `
  }
}

console.log('router >>>> ', router)

install(Component, {
  // store: store
  router: router
}).then(() => {
  router.addRoutes(generateRoutes(routes))
  new App()
})

// new App()