import Component from '@/core/component'
import RouterLink from '@/components/RouterLink'

export default class SideBar extends Component {
  data () {
    return {
      components: { RouterLink }
    }
  }

  template () {
    return `
      <nav class="SideBar router sidebar">
        <template class="RouterLink"></template>
      </nav>
    `
  }

  created () {
    super.created()
    console.log('created in SideBar')
  }
}