export function importComponent (route) {
  route.component()
    .then((data) => {
      // router로 랜더되는 컴포넌트 ex) Router-view
      data.default.render('.RouterView')
    })
}