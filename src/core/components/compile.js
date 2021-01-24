import {
  Watcher
} from '@/core/components/observer'

import {
  VALUE_REG,
  NATION_REG,
  OR_REG
} from '@/core/components/regex'

import {
  directiveFor
} from '@/core/components/directives'

import {
  convertTagName
} from '@/core/util/util'

export default class Compile {
  static directives = ['if', 'for', 'model']
  static events = ['click', 'change']

  constructor (el, vm) {
    this.$vm = vm

    if (el) {
      this.$el = isNodeElement(el) ? el :  document.querySelector(el)
    } else {
      const tagName = convertTagName(this.$vm.$options.name)
      this.$el = document.querySelector(tagName)
    }

    // TODO 컴포넌트 네임으로 된 태크 제거
    this.$el.innerHTML = this.$vm.$options.template.call(this.$vm)
    this.compile(this.$el)
  }

  compile (elements, scope) {
    Array.prototype.forEach.call(elements.childNodes, (node) => {

      if (isTextElement(node) && VALUE_REG.test(node.textContent)) {
        console.log('1-1. [compile - text node]', node, node.textContent, 'scope?', !!scope)
        const matched = node.textContent.match(VALUE_REG)
        const updateText = (node) => {
          node.textContent = node.textContent.replace(VALUE_REG, (match, $1) => this.parseExpression($1.trim(), scope || this.$vm))
        }

        matched.forEach(match => {
          updateText.call(this, node)

          // new Watcher({
          //   vm: this.$vm,
          //   key: match,
          //   cb: (val, oldVal) => {
          //     updateText.call(this, node)
          //   }
          // })
        })
      }

      if (isNodeElement(node)) this.compileElement(node, scope)

      if (node.childNodes && node.childNodes.length > 0) this.compile(node, scope)
    })
  }

  compileElement (node, scope) {
    const attrs = node.attributes

    if (/(-)/.test(node.localName)) {
      console.log('1-2. [compile element node] - tag')
      this.$vm.$options.components[convertTagName(node.localName)].render()
    }

    Array.prototype.forEach.call(attrs, (attr) => {
      const value = attr.value

      if (Compile.directives.indexOf(attr.name) !== -1 && checkAttrExist(value)) {
        console.log('1-3. [compile element node] - attributes', attr.name, attr.value)
        directiveFor.call(this, {
          attr: value,
          node: node
        })
      } else {
        console.log('1-3. [compile element node] - attributes', attr.name, attr.value)
        if (VALUE_REG.test(attr.value)) {
          attr.value = attr.value.replace(VALUE_REG, (match, $1) => this.parseExpression($1.trim(), scope || this.$vm))
        }
      }
    })

  }

  parseExpression (keys, data) {
    console.log('2. [parseExpression]', keys, data)
    let result = null

    const _getVal = (keys, data) => {
      let parseData = data
      const dotIndex = keys.indexOf('.')
      const key = {
        data: keys.substr(0, dotIndex),
        attr: keys.substr(dotIndex + 1)
      }

      console.log('3. [_getVal]', keys, parseData)

      if (dotIndex !== -1) {
        parseData = parseData[key.data]
        if (key.attr.indexOf('.') !== -1) _getVal(key.attr,  parseData)
        else return parseData[key.attr]
      } else {
        return data[key.attr]
      }
    }

    while ((result = NATION_REG.exec(keys)) !== null) {
      keys = keys.replace(result[0], `.${_getVal(result[1], data)}`)
    }

    return _getVal(keys, data)
  }

  getVal (keys, data) {
    let parseData = data
  }
}

function isNodeElement (node) {
  return node.nodeType === 1
}

function isTextElement (node) {
  return node.nodeType === 3
}

function isCommentElement (node) {
  return node.nodeType === 8
}

function checkAttrExist (value) {
  return value !== '' && value
}

function nodeToArray (node) {
  return Array.from(node)
}