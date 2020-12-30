function getLocation () {
  console.log('getLocation ', window.location)
  return {
    fullPath: window.location.href,
    path: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search
  }
}

function genFullPath (to) {
  console.log('genFullPath >', to)
  return `${to.path}${stringifyQuery(to.query)}${to.hash || ''}`
}

function stringifyQuery (query) {
  if (query) {
    const queryToStringArr = Object.keys(query).map(key => `${key}=${query[key] || ''}`)
    return `?${queryToStringArr.join('&')}`
  } else {
    return ''
  }
}

export {
  getLocation,
  genFullPath
}