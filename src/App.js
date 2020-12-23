import Component from '@/core/component'
// import Store from '@/core/store/store'
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
      <div class="TopBar"></div>
      <div class="SideBar"></div>
    `
  }
}

install(Component, {
  // store: store
  router: router
}).then(() => new App())

// new App()