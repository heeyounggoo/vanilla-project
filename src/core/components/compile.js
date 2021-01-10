import {
  Watcher
} from '@/core/components/observer'

import {
  convertTagName
} from '@/core/util/util'

export default class Compile {
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

  compile (elements) {
    Array.prototype.forEach.call(elements.childNodes, (node) => {
      const regex = /\{\{(.*)\}\}/

      if (isNodeElement(node)) {
        this.compileElement(node)
      }
      if (isTextElement(node) && regex.test(node.textContent)) {
        const key = RegExp.$1.trim()
        this.bind(node, key, 'text')
        // updateText(node, this.getVal(key))
        // this.bind(node, this.$vm, key, updateText(node, this.getVal(key)))
      }
      if (node.childNodes && node.childNodes.length > 0) this.compile(node)
    })
  }

  compileElement (node) {
    const attrs = node.attributes

    if (/(-)/.test(node.localName)) {
      this.$vm.$options.components[convertTagName(node.localName)].render()
    }

    Array.prototype.forEach.call(attrs, (attr) => {
      const key = attr.value

      if (attrsEvent(attr)) {
        // Event handler
      }

      if (attr.name === 'model') {
        node.value = this.getVal(key)
        this.bind(node, this.$vm, key)
        node.addEventListener('input', (e) => {
          if (e.currentTarget.value === this.getVal(key)) return
          this.setVal(key, e.currentTarget.value)
        })
      }
    })
  }

  bind (node, key, type) {
    const func = update[`${type}Update`]
    func && func(node, this.getVal(key))

    new Watcher({
      vm: this.$vm,
      key: key,
      cb: (val, oldVal) => {
        func(node, val, oldVal)
      }
    })
  }

  getVal (key) {
    return this.$vm[key]
  }

  setVal (key, val) {
    this.$vm[key] = val
  }
}


const update = {
  textUpdate: function (node, value) {
    console.log('--- textupdate ---', node, value)
    node.textContent = value
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

function attrsEvent (attr) {
  const eventAttrs = ['click', 'change']
  return eventAttrs.indexOf(attr) !== -1
}