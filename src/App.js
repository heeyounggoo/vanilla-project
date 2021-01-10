import Component from '@/core/components/component'
import SideBar from '@/pages/common/SideBar'
// import TopBar from '@/pages/common/TopBar'
import '@/assets/style/global.scss'

console.log(1, 'App.js')

const App = new Component({
  el: '#App',
  name: 'App',
  components: { SideBar },
  data: {
    message: 'hello'
  },
  template () {
    //language=HTML
    return `
      <div class="container">
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
App.render()