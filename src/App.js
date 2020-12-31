import Component from '@/core/component'
import router from '@/router/index'
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
        <div class="page">
          <div class="RouterView row"></div>
        </div>
      </main>
    </div>
    `
  }
}

install(Component, {
  router: router
}).then(() => {
  new App()
  router.push()
})