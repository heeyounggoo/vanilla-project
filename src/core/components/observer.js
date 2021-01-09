export default class Observer {
  constructor (vm) {
    this.$vm = vm
    this.defineReactive()
  }

  defineReactive () {
    const vm  = this.$vm
    Object.keys(this.$vm._data).forEach(key => {
      const dep = new Dep()

      Object.defineProperty(this.$vm, key, {
        // enumerable: true,
        // configurable: false,
        get: function () {
          return vm._data[key]
        },
        set: function (val) {
          if (vm._data[key] !== val) {
            vm._data[key] = val
          }
        }
      })
    })
  }
}