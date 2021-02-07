import {
  FOR_REG
} from '@/core/components/regex'

export function directiveFor ({ attr, node }) {
  let itemKey = null
  let arrayKey = null

  const result = FOR_REG.exec(attr)

  if (result) {
    itemKey = result[1]
    arrayKey = result[2]
  }

  const repeat = () => {
    const array = this.parseExpression.call(this, arrayKey, this.$vm)
    const itemScope = Object.create(this.$vm)

    array.forEach(item => {
      const el = node.cloneNode(true)
      itemScope.$itemKey = itemKey
      itemScope.$arrayKey = arrayKey
      itemScope[itemKey] = item

      el.removeAttribute('for')
      node.parentNode.insertBefore(el, node)
      this.compile.call(this, el, itemScope)
    })

    node.parentNode.removeChild(node)

    if (node.childNodes && node.childNodes.length) {
      node.innerHTML = ''
    }
  }

  repeat()
}