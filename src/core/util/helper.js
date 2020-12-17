export function isObject (data) {
  const toString = Object.prototype.toString

  return toString.call(data) === '[object Object]'
}

export function hasOwnProperty (targetObj, key) {
  return Object.prototype.hasOwnProperty.call(targetObj, key)
}