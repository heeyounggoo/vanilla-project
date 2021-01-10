// TODO 추후 기능별로 분리
function isObject (data) {
  const toString = Object.prototype.toString

  return toString.call(data) === '[object Object]'
}

export function hasOwnProperty (targetObj, key) {
  return Object.prototype.hasOwnProperty.call(targetObj, key)
}

export function assignObjectKeyValue (obj) {
  if (!obj && !isObject(obj)) {
    return false
  }

  Object.keys(obj).forEach(key => {
    if (hasOwnProperty(this, key)) {
      console.error(key, 'has already defined. Please define another name')
      return false
    }

    this[key] = obj[key]
  })
}

export function convertTagName (name) {
  // side-bar > SideBar, SideBar > side-bar
  const regex = /(-)/

  if (regex.test(name)) {
    return name.split('-').map(code => code[0].toUpperCase() + code.slice(1, code.length)).join('')
  } else {
    const toConvertName = name[0].toLowerCase() + name.slice(1, name.length)
    return toConvertName.replace(/[A-Z]/g, string => `-${string.toLowerCase()}`)
  }
}