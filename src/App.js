import Component from '@/core/components/component'
import Router from '@/router/index'
import SideBar from '@/pages/common/SideBar'
import TopBar from '@/pages/common/TopBar'
import '@/assets/style/global.scss'

const App = new Component({
  el: '#App',
  name: 'App',
  components: { SideBar, TopBar },
  /*data: {
    key: {
      title: 'title',
      desc: 'desc'
    },
    text: {
      title: 'App',
      desc: 'App입니다.'
    }
  },
  computed: {
    computedText () {
      return this.text.title + 'computed'
    }
  },*/
  template () {
    //language=HTML
    return `
      <div class="container">
        <side-bar></side-bar>
        <top-bar></top-bar>
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
