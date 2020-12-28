// TODO fragment 기능 추가, div로 바로 랜더되지 않도록 하기 위함
import {
  assignObjectKeyValue,
  hasOwnProperty
} from '@/core/util/util'

export default class Component {
  $options
  $el
  $router
  $route
  $store

  constructor (props) {
    this._functional = props ? hasOwnProperty(props, 'functional') ? props.functional : false : false

    assignObjectKeyValue.call(this, props)
    assignObjectKeyValue.call(this, this.data())

    this.init()
  }

  init () {
    setGlobalProtoType.call(this)
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
  const target = this._functional ? '.RouterView' : `.${this.$options.name}`
  const wrapper =  document.querySelector(target) || document.querySelector('#App')
  wrapper.innerHTML = this.template()

  this.$el = wrapper

  if (hasChildComp) {
    Object.keys(this.$options.components).forEach(item => {
      new this.$options.components[item]()
    })
  }

  this.created()
}

function setOption () {
  this.$el = null
  this.$options = Object.assign({}, {
    name: this.constructor.name,
    components: hasOwnProperty(this.data(), 'components') ? this.data().components : {}
  })
}

function setGlobalProtoType () {
  this.$router = Component.prototype.$router
}