const Dep = {
  target: null
}

let _self = null

function defineReactive (obj, key, val) {
  const deps = []

  Object.defineProperty(obj, key, {
    get: () => {
      if (Dep.target && deps.indexOf(Dep.target)) {
        deps.push(Dep.target)
      }

      return val
    },

    set: (newVal) => {
      if (newVal !== val) {
        val = newVal
        deps.forEach(func => func())

        _self.render()
      }
    }
  })
}

function defineComputed (obj, key, compute) {
  _self = this
  function depSetter () {
    return compute.call(_self)
  }

  Object.defineProperty(obj, key, {
    get: () => {
      Dep.target = depSetter
      const value = compute.call(this)
      Dep.target = null

      return value
    },
    set: () => {
      console.error('Computed Data can\'t use setter')
    }
  })
}

export {
  defineReactive,
  defineComputed
}