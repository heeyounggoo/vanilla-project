export default class Store {
  constructor (options = {}) {
    const store = this
    const { dispatch, commit } = this

    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this.state = Object.create(null)
    install(store, options)

    this.dispatch = function (type, payload) {
      return dispatch.call(store, type, payload)
    }

    this.commit = function (type, payload) {
      return commit.call(store, type, payload)
    }
  }

  dispatch (type, payload) {
    console.log('dispatch', type, payload)
  }

  commit (type, payload) {
    console.log('commit', type, payload)
  }
}

function install (store, root) {
  // install state, mutation, actions ...
  registerState(store, root.state)
  forEachRegister(store, root._mutations, '_mutations')
  forEachRegister(store, root._actions, '_actions')
}

function registerState (store, state) {
  store.state = Object.assign({}, state)
}

function forEachRegister (store, handler, type) {
  if (handler) {
    Object.keys(handler).forEach(key => {
      store[type][key] = handler[key]
    })
  }
}