import Component from '@/core/component'
import SideBar from '@/pages/common/SideBar'

const App = class App extends Component {
  data () {
    return {
      components: { SideBar }
    }
  }
  /*
  setRouter () {
    // set router after add component
    import('@/router/index')
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(err => console.log(err))
  }
  */
}

new App()