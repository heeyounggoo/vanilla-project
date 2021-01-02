// TODO props 변경시 data, dom render 처리

import {
  PROPS,
  DATA
} from '@/mixins/dataTable/defaultProps'

import {
  renderTable,
  renderTableFooter
} from '@/mixins/dataTable/dom';

import {
  dropdown
} from '@/mixins/dataTable/event'

export default class DataTable {
  constructor (target, props) {
    this.props = Object.assign({}, PROPS, props)
    this.data = DATA(this.props)

    this.render(target)
    dropdown.call(this, target)
  }

  render (target) {
    //language=HTML
    const tableTemplate = `
      <div class="table row">
        <div class="table-head col col-12"></div>
        <div class="table-body col col-12">${renderTable(this.props, this.data)}</div>
        <div class="table-footer col col-12">${renderTableFooter(this.props, this.data)}</div>
      </div>
    `

    target.innerHTML = tableTemplate
  }
}