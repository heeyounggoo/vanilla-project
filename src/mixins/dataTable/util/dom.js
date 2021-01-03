import {
  getItems
} from '@/mixins/dataTable/util/util'

function renderTable () {
  const templateInnerHeader = this.headers.map(header => `<th>${header.text}</th>`).join('')
  const templateInnerBody = this.items.slice(this.startPage - 1, this.lastPage).map(item => {
    return `<tr>${this.headers.map(header => `<td>${item[header.value]}</td>`).join('')}</tr>`
  }).join('')

  //language=HTML
  return `
      <table>
        <thead><tr>${templateInnerHeader}</tr></thead>
        <tbody>${templateInnerBody}</tbody>
      </table>
    `
}

function renderTableFooter () {
  const pageItems = getItems(this)
  const isFirstPage = this.page === pageItems[0]
  const isLastPage = this.page === pageItems[pageItems.length - 1]

  //language=HTML
  const footerSelectTemplate = `
    <span class="table-footer__select__text pa-2 text--bold">${this.itemsPerPageText}</span>
    <div class="table-footer__select__menu dropdown">
      <button class="table-footer__select__menu__btn dropdown-btn input input--outlined">${this.itemsPerPage}</button>
      <div class="table-footer__select__menu__items dropdown-menu">
        <ul>
          ${this.itemsPerPageOptions.map(item => `<li class="dropdown-menu__item"><button class="input ${this.itemsPerPage === item ? 'selected' : ''}">${item}</button></li>`).join('')}
        </ul>
      </div>
    </div>
  `

  //language=HTML
  const footerPagination = `
    <span class="pa-2 mr-4 text--bold">${this.startPage} - ${this.lastPage} of ${this.itemsLength}</span>
    <button class="table-footer__pagination__prev prev-next-btn input pa-0" ${isFirstPage ? 'disabled' : ''}>
      <i class="fas fa-angle-left icon ${isFirstPage ? 'icon--disabled' : ''}" style="user-select: auto;"></i>
    </button>
    <div class="table-footer__pagination__pages">
      <ul>
        ${pageItems.map(page => `<li><button class="input input--default ${this.page === page ? 'active' : 'default'}">${page}</button></li>`).join('')}
      </ul>
    </div>
    <button class="table-footer__pagination__next prev-next-btn input pa-0" ${isLastPage ? 'disabled' : ''}>
      <i class="fas fa-angle-right icon ${isLastPage ? 'icon--disabled' : ''}" style="user-select: auto;"></i>
    </button>
  `

  //language=HTML
  return `
    <div class="table-footer__select">${footerSelectTemplate}</div>
    <div class="table-footer__pagination">${footerPagination}</div>
  `
}

export {
  renderTable,
  renderTableFooter
}