// TODO fragment 기능 추가, div로 바로 랜더되지 않도록 하기 위함
import {
  assignObjectKeyValue,
  hasOwnProperty
} from '@/core/util/util'

export default class Component {
  $options
  $el

  constructor (props) {
    assignObjectKeyValue.call(this, props, 'props-set')
    assignObjectKeyValue.call(this, this.data(), 'data-set')

    setOption.call(this)
    renderDOM.call(this)
  }

  // 컴포넌트 내부에서 사용할 데이터 셋팅
  data () {
    return {}
  }

  // template
  template () {
    return ''
  }

  created () {
    this.mounted()
  }

  mounted () {}
}

function renderDOM () {
  const hasChildComp = hasOwnProperty(this.$options, 'components', 'renderDOM')
  console.log(1, 'renderDOM', hasChildComp, this.$options.name)
  const wrapper = document.querySelector(`.${this.$options.name}`) || document.querySelector('#App')
  wrapper.innerHTML = this.template()

  this.$el = wrapper

  if (hasChildComp) {
    Object.keys(this.$options.components).forEach(item => {
      console.log(2, item, 'render start in', this.$options.name)
      new this.$options.components[item]()
    })
  }

  console.log(3, this)

  this.created()
}

function setOption () {
  this.$el = null
  this.$options = Object.assign({}, {
    name: this.constructor.name,
    components: hasOwnProperty(this.data(), 'components') ? this.data().components : {}
  })
}