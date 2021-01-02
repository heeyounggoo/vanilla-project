import {
  getItems
} from '@/mixins/dataTable/util'

function renderTable (props, data) {
  const templateInnerHeader = props.headers.map(header => `<th>${header.text}</th>`).join('')
  const templateInnerBody = props.items.slice(data.startPage - 1, data.lastPage).map(item => {
    return `<tr>${props.headers.map(header => `<td>${item[header.value]}</td>`).join('')}</tr>`
  }).join('')

  //language=HTML
  return `
      <table>
        <thead><tr>${templateInnerHeader}</tr></thead>
        <tbody>${templateInnerBody}</tbody>
      </table>
    `
}

function renderTableFooter (props, data) {
  const pageItems = getItems(props, data)

  //language=HTML
  const footerSelectTemplate = `
    <span class="table-footer__select__text pa-2 text--bold">${props.itemsPerPageText}</span>
    <div class="table-footer__select__menu dropdown">
      <button class="table-footer__select__menu__btn dropdown-btn input input--outlined">${props.itemsPerPage}</button>
      <div class="table-footer__select__menu__items dropdown-menu">
        <ul>
          ${props.itemsPerPageOptions.map(item => `<li class="dropdown-menu__item"><button class="input">${item}</button></li>`).join('')}
        </ul>
      </div>
    </div>
  `

  //language=HTML
  const footerPagination = `
    <span class="pa-2 mr-4 text--bold">${data.startPage} - ${data.lastPage} of ${data.itemsLength}</span>
    <div class="table-footer__pagination__prev"></div>
    <div class="table-footer__pagination__pages">
      <ul>
        ${pageItems.map(page => `<li><button class="input input--default ${props.page === page ? 'active' : 'default'}">${page}</button></li>`).join('')}
      </ul>
    </div>
    <div class="table-footer__pagination__prev"></div>
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