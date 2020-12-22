import Component from '@/core/component'

export default class RouterLink extends Component {
  template () {
    return `
      <ul class="router-link">
        <li class="router-link__item">
          <a class="router-link__anchor" href="#"></a>
        </li>
      </ul>
    `
  }
}