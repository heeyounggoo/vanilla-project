import Component from '@/core/component'

export default class DashBoard extends Component {
  data () {
    return {}
  }

  template () {
    return `
      <div>${this.$options.name}</div>
    `
  }
}