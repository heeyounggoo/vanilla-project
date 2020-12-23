import { hasOwnProperty } from '@/core/util/util'

async function install (component, options) {
  this.components = component
  this.options = options
  const promise = Object.keys(options).map(option => setGlobalOptions.call(this, option))
  await Promise.all(promise)
}

function setGlobalOptions (option) {
  return new Promise((resolve) => {
    this.components.prototype[`$${option}`] = this.options[option]

    if (hasOwnProperty(this.components.prototype, `$${option}`)) {
      return resolve(true)
    }
  })
}

export default install