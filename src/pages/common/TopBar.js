import Component from '@/core/component'

export default class TopBar extends Component {
  template () {
    return `
      <header></header>
    `
  }

  created () {
    console.log('created in TopBar', this)
  }
}