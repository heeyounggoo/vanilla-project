import Component from '@/core/component'
import SideBar from '@/pages/common/SideBar'
// import Api from '@/pages/playground/Api'

const App = class App extends Component {
  data () {}

  template () {
    return `<div id="app"><div class="page"></div></div>`
  }

  mounted () {
    new SideBar('nav')
    // new Api()
    this.setRouter()
  }

  setRouter () {
    // set router after add component
    import('@/router/index')
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(err => console.log(err))
  }
}

new App()