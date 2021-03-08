import Component from '@/core/components/component'
import Router from '@/router/index'
import SideBar from '@/pages/common/SideBar'
import TopBar from '@/pages/common/TopBar'
import '@/assets/style/global.scss'

const App = new Component({
  el: '#App',
  name: 'App',
  components: { SideBar, TopBar },
  template () {
    //language=HTML
    return `
      <div class="container">
        <top-bar></top-bar>
        <side-bar></side-bar>
        <main class="main">
          <div class="page">
            <div class="RouterView row"></div>
          </div>
        </main>
      </div>
    `
  },
  created () {}
})

async function install () {
  Component.prototype.$router = Router
}

install().then(() => {
  Router.push()
  App.render()
})
