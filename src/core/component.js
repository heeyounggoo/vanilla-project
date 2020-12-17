import { assignObjectKeyValue } from '@/core/util/util'

export default class Component {
  constructor (props) {
    assignObjectKeyValue.call(this, props)
    assignObjectKeyValue.call(this, this.data())

    this.created()
    this.render()
  }

  // 컴포넌트 내부에서 사용할 데이터 셋팅
  data () {}

  // template
  template () {}

  created () {}

  mounted () {}

  // 작성한 template 코드 dom에 랜더
  render () {
    // TODO 클래스 명칭으로 class 추가
    console.log(this, this.template())
    const dom = document.createElement('div')

    dom.innerHTML = this.template()
    document.body.appendChild(dom)

    this.mounted()
  }
}