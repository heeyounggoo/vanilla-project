export function importComponent (route) {
  route.component()
    .then((data) => {
      new data.default({
        functional: true
      })
    })
}