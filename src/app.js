function component() {
  const isProduction = process.env.NODE_ENV === 'production'
  const element = document.createElement('div')

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello World'

  alert(isProduction)
  return element
}

document.body.appendChild(component())