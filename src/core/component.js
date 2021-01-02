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
    this.created()
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
    // dom 생성 전, data/$options 등 부모 클래스 데이터 및 자식 데이터 선
  }

  mounted () {
    // dom 생성 후로 $el 접근 가능 자식에서 dom 접근 가능
  }
}

function renderDOM () {
  const hasChildComp = hasOwnProperty(this.$options, 'components')
  const target = this._functional ? '.RouterView' : `.${this.$options.name}`
  const wrapper =  document.querySelector(target) || document.querySelector('#App')
  wrapper.innerHTML = this.template()

  this.$el = wrapper

  if (hasChildComp) {
    Object.keys(this.$options.components).forEach(item => {
      new this.$options.components[item]()
    })
  }

  this.mounted()
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