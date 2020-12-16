function setData (data) {
  // TODO 동일 데이터 네임 조건처리 및 에러 표
  if (data) Object.assign(this, data)
}

export default class Component {
  constructor (props) {
    setData.call(this, this.data())
    setData.call(this, props)

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