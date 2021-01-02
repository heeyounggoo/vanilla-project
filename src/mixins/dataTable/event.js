function dropdown (target) {
  if (!target) return false
  const dropdown = target.querySelector('.dropdown')
  const button = dropdown.querySelector('.dropdown-btn')
  const menu = dropdown.querySelector('.dropdown-menu')
  const options = dropdown.querySelectorAll('.dropdown-menu__item')

  button.addEventListener('click', () => {
    menu.classList.toggle('show')
  })

  // button.addEventListener('blur', () => {
  //   menu.classList.remove('show')
  // })

  options.forEach(option => {
    option.addEventListener('click', (e) => {
      option.classList.add('selected')
      this.props.itemsPerPage = e.target.textContent

      console.log(this.props, e)
    })
  })
}

export {
  dropdown
}