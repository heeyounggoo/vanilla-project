const PROPS = {
  items: [],
  headers: [],
  noDataText: '데이터가 없습니다.',
  noResultText: '조회된 결과가 없습니다.',
  page: 1,
  search: '',
  // multiSort: false,
  // sortBy: '',
  // sortDesc: '',
  // footer props
  totalVisible: 10,
  disablePagination: false,
  disableItemsPerPage: false,
  itemsPerPage: 5,
  itemsPerPageOptions: [5, 10, 15, 50, 100],
  itemsPerPageText: 'Rows per page'
}

const COMPUTED = {
  // arrow function this 바인딩 불가
  itemsLength () {
    return this.items.length
  },
  startPage () {
    return this.page - 1 === 0 ? 1 : (this.page - 1) * this.itemsPerPage
  },
  lastPage () {
    return this.page * this.itemsPerPage > this.items.length ? this.items.length : this.page * this.itemsPerPage
  },
  pageCount () {
    return Math.ceil(this.items.length / this.itemsPerPage)
  }
}

export {
  PROPS,
  COMPUTED
}