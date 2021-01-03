import {
  PROPS,
  COMPUTED,
  renderTable,
  renderTableFooter,
  defineReactive,
  defineComputed,
  setEvent
} from '@/mixins/dataTable/index'

export default class DataTable {
  constructor (target, props) {
    this.targetEl = target
    this.init(props)
    this.render(target)
  }

  init (props) {
    const newProps = Object.assign({}, PROPS, props)
    for (const key in newProps) {
      defineReactive(this, key, newProps[key])
    }

    for (const key in COMPUTED) {
      defineComputed.call(this, this, key, COMPUTED[key])
    }
  }

  render () {
    //language=HTML
    const tableTemplate = `
      <div class="table row">
        <div class="table-head col col-12"></div>
        <div class="table-body col col-12">${renderTable.call(this)}</div>
        <div class="table-footer col col-12">${renderTableFooter.call(this)}</div>
      </div>
    `

    this.targetEl.innerHTML = tableTemplate
    setEvent.call(this)
  }
}