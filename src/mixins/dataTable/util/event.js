function type (value) {
  const toString = Object.prototype.toString
  return toString.call(value).replace(/(\[)|(])/g, '').split(' ').slice(-1)[0]
}

function changeItemsPerPage () {
  // itemsPerPage dropdown event
  const dropdown = this.targetEl.querySelector('.dropdown')
  const button = dropdown.querySelector('.dropdown-btn')
  const menu = dropdown.querySelector('.dropdown-menu')

  button.addEventListener('click', () => {
    menu.classList.toggle('show')
  })

  button.addEventListener('blur', () => {
    menu.classList.remove('show')
  })

  menu.addEventListener('click', (e) => {
    const value = e.target.textContent.trim()

    switch (type(this.itemsPerPage)) {
      case 'Number':
        this.itemsPerPage = Number(value)
        break
      case 'String':
        this.itemsPerPage = value
        break
    }
    e.target.classList.add('selected')
  })
}

function changePage () {
  // pagination event
  const pagination = this.targetEl.querySelector('.table-footer__pagination__pages')
  pagination.addEventListener('click', (e) => {
    const value = e.target.textContent.trim()

    switch (type(this.page)) {
      case 'Number':
        this.page = Number(value)
        break
      case 'String':
        this.page = value
        break
    }
  })
}

function prevNextPage () {
  // prev-next buttons event
  const prevNextBtn = this.targetEl.querySelectorAll('.prev-next-btn')

  prevNextBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const isPrevBtn = [...e.currentTarget.classList].includes('table-footer__pagination__prev')
      this.page = isPrevBtn ? this.page - 1 : this.page + 1
    })
  })
}

function setEvent () {
  if (this.targetEl) {
    changeItemsPerPage.call(this)
    changePage.call(this)
    prevNextPage.call(this)
  }
}

export {
  setEvent
}