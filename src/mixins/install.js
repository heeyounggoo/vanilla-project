export function install (component, options) {
  console.log(component, options)
  component.prototype.$store = options.store
  // component.prototype.$router = options.router
}