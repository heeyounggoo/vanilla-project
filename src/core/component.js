import { assignObjectKeyValue } from '@/core/util/util'

export default class Component {
  constructor (tag, props) {
    assignObjectKeyValue.call(this, props)
    assignObjectKeyValue.call(this, this.data())

    this.tag = tag

    this.created()
    this.render()
  }

  // 컴포넌트 내부에서 사용할 데이터 셋팅
  data () {}

  // template
  template () {
    // TODO template 작성할 때 루프시 매번 join 하지 않는 방법 찾
  }

  created () {}

  mounted () {}

  // 작성한 template 코드 dom에 랜더
  render () {
    // TODO 클래스 명칭으로 class 추가
    console.log('[template in components]', this.template())
    const dom = document.createElement(this.tag || 'div')
    const app = document.querySelector('#app') || document.body

    dom.innerHTML = this.template()
    app.appendChild(dom)

    this.mounted()
  }
}