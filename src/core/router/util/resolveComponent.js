export function importComponent (route) {
  return new Promise((resolve, reject) => {
    route.component()
      .then(data => {
        resolve(true)
        return new data.default({
          functional: true
        })
      })
      .catch((err) => reject(err))
  })
}