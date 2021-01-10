import Compile from '@/core/components/compile'
import {
  Observer
} from '@/core/components/observer'
import {
  hasOwnProperty
} from '@/core/util/util'

export default class Component {
  constructor (options) {
    this.$options = options || {}
    this._data = this.$options.data

    new Observer(this)
    this.defineComputed()
    this.defineHooks()
  }

  render () {
    this.executeHooks('created')
    this.$el = new Compile(this.$options.el, this)
  }

  defineComputed () {
    const self = this
    const computed = this.$options.computed

    if (computed && Object.keys(computed).length > 0) {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(self, key, {
          get: computed[key],
          set: function () {}
        })
      })
    }
  }

  executeHooks (hook) {
    if (hasOwnProperty(this, hook) && this[hook]) {
      this[hook]()
    }
  }

  defineHooks () {
    const hooks = [
      'created',
      'mounted'
    ]

    hooks.forEach(hook => {
      this[hook] = this.$options[hook]
    })
  }
}