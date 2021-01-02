import Component from '@/core/component'
import DataTable from '@/mixins/dataTable/dataTable'

export default class ExpendIncome extends Component {
  data () {
    return {
      tableProps: {
        headers: [
          { text: '날짜', value: 'date' },
          { text: '구분', value: 'type' },
          { text: '대분류', value: 'categoryId' },
          { text: '소분류', value: 'itemId' },
          { text: '비용', value: 'payment' },
          { text: '내용', value: 'memo' }
        ],
        items: [
          { date: '2020-12-13', type: '이체', memo: '주식회사 아성다이소', itemId: '미분류', payment: '5000', categoryId: '미분류' },
          { date: '2020-12-13', type: '이체', memo: '씨유 미아역점', itemId: '미분류', payment: '3500', categoryId: '미분류' },
          { date: '2020-12-13', type: '이체', memo: '구희영', itemId: '미분류', payment: '5000', categoryId: '이체' },
          { date: '2020-12-12', type: '지출', memo: '이디야', itemId: '커피/음료', payment: '4900', categoryId: '카페/간식' },
          { date: '2020-12-12', type: '지출', memo: '(주)씨스페이시스미', itemId: '편의점', payment: '2200', categoryId: '생활' },
          { date: '2020-12-10', type: '지출', memo: '후불교통대금', itemId: '대중교통', payment: '62800', categoryId: '교통' },
          { date: '2020-12-10', type: '수입', memo: '카카오뱅크 캐시백지', itemId: '미분류', payment: '3865', categoryId: '금융수입' },
          { date: '2020-12-08', type: '지출', memo: '씨유 석관중앙점', itemId: '편의점', payment: '2700', categoryId: '생활' },
          { date: '2020-12-08', type: '이체', memo: '구희영', itemId: '미분류', payment: '44000', categoryId: '이체' },
          { date: '2020-12-08', type: '이체', memo: '구희영', itemId: '미분류', payment: '44000', categoryId: '이체' },
          { date: '2020-12-08', type: '수입', memo: '모어레브', itemId: '미분류', payment: '42505', categoryId: '기타수입' },
          { date: '2020-12-06', type: '지출', memo: '전국고속버스운', itemId: '시외버스', payment: '44000', categoryId: '교통' },
          { date: '2020-12-04', type: '지출', memo: '씨유 석관중앙점', itemId: '편의점', payment: '1900', categoryId: '생활' },
          { date: '2020-12-02', type: '이체', memo: '구희영', itemId: '미분류', payment: '200000', categoryId: '이체' },
          { date: '2020-12-02', type: '이체', memo: '구희영', itemId: '미분류', payment: '300000', categoryId: '이체' },
          { date: '2020-12-02', type: '이체', memo: '구희영', itemId: '미분류', payment: '300000', categoryId: '이체' },
          { date: '2020-12-02', type: '이체', memo: '모바일', itemId: '미분류', payment: '200000', categoryId: '내계좌이체' },
          { date: '2020-12-02', type: '이체', memo: '모바일', itemId: '미분류', payment: '300000', categoryId: '내계좌이체' },
          { date: '2020-12-02', type: '이체', memo: '모바일', itemId: '미분류', payment: '300000', categoryId: '내계좌이체' },
          { date: '2020-11-30', type: '지출', memo: '크로키닷컴(주)', itemId: '인터넷쇼핑', payment: '63400', categoryId: '온라인쇼핑' },
          { date: '2020-11-30', type: '지출', memo: '유기용(모어레브)', itemId: '인터넷쇼핑', payment: '48505', categoryId: '온라인쇼핑' },
          { date: '2020-11-30', type: '지출', memo: '구희영', itemId: '회비', payment: '30000', categoryId: '경조/선물' }
        ],
        itemsPerPage: 10
      }
    }
  }

  template () {
    //language=HTML
    return `
      <h2 class="page--header col col-12">${this.$router.route.meta.title}</h2>
      <div class="page--container col col-12">
        <div class="row">
          <div class="pannel data-table col col-12"></div>
        </div>
      </div>
    `
  }

  created () {
    super.created()
  }

  mounted () {
    super.mounted()
    const table = this.$el.querySelector('.data-table')
    new DataTable(table, this.tableProps)
  }
}