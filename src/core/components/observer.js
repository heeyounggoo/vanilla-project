class Observer {
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
          console.log(1, `get ${key} in observer`)
          if (Dep.target) {
            dep.add(Dep.target)
          }
          return vm._data[key]
        },
        set: function (val) {
          if (vm._data[key] !== val) {
            vm._data[key] = val
            dep.notify()
          }
        }
      })
    })
  }
}

class Dep {
  constructor () {
    this.target = null
    this.value = ''
    this.sub = []
  }

  add (cb) {
    this.sub.push(cb)
  }

  notify () {
    this.sub.forEach(watcher => {
      watcher.update()
    })
  }
}

class Watcher {
  constructor (options) {
    this.$vm = options.vm
    this.cb = options.cb
    this.key = options.key

    this.init()
  }

  init () {
    Dep.target = this
    this.value = this.getKey()
    Dep.target = null
  }

  update () {
    const value = this.getKey()
    const oldVal = this.value
    this.cb.call(this.$vm, value, oldVal)
    this.value = value
  }

  getKey () {
    return this.$vm[this.key]
  }
}

export {
  Observer,
  Watcher,
  Dep
}