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

const DATA = (props) => {
  return {
    itemsLength: props.items.length,
    startPage: props.page - 1 === 0 ? 1 : (props.page - 1) * props.itemsPerPage,
    lastPage: props.page * props.itemsPerPage > props.items.length ? props.items.length : props.page * props.itemsPerPage,
    pageCount: Math.ceil(props.items.length / props.itemsPerPage)
  }
}

export {
  PROPS,
  DATA
}