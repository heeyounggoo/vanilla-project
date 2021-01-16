import Component from '@/core/components/component'

export default new Component({
  name: 'DashBoard',
  template () {
    return `
      <div>${this.$options.name}</div>
    `
  }
})