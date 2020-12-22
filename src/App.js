// TODO 자식 컴포넌트 2개 이상일 경우 랜더 안되는 이슈

import Component from '@/core/component'
// import Store from '@/core/store/store'
import SideBar from '@/pages/common/SideBar'
// import TopBar from '@/pages/common/TopBar'
// import { install } from '@/mixins/install'
import '@/assets/style/global.scss'

// install.call(this, Component, {
//   store: store
// })

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