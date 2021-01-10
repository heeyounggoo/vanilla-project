import Compile from '@/core/components/compile'
import {
  Observer
} from '@/core/components/observer'

export default class Component {
  constructor (options) {
    this.$options = options || {}
    this._data = this.$options.data

    new Observer(this)
    this.defineComputed()

    this.$el = new Compile(this.$options.el || document.body, this)
  }

  defineComputed () {
    const self = this
    const computed = this.$options.computed

    Object.keys(computed).forEach(key => {
      Object.defineProperty(self, key, {
        get: computed[key],
        set: function () {}
      })
    })
  }
}