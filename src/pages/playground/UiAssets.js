import Component from '@/core/components/component'

export default new Component({
  name: 'UiAssets',
  data: {
    button: {
      type: ['default', 'rounded', 'outlined', 'disabled'],
      size: ['lg', 'md', 'sm']
    },
    alert: {
      type: ['default', 'outlined'],
      state: ['success', 'warning', 'error']
    }
  },
  template () {
    return `
      <div class="Assets">
        <h2>Assets</h2>
        <h3>Buttons</h3>
        <div class="button-group--type">
          ${this.button.type.map(type => `<button class="btn btn--md btn--${type}">button - ${type}</button>`).join('')}       
        </div>
        <div class="button-group--size">
          ${this.button.size.map(size => `<button class="btn btn--default btn--${size}">button - ${size}</button>`).join('')}
        </div>
        
        <h3>Alert</h3>
        <div class="alert-group">
          <div class="alert alert--default alert--success">
            <div class="alert__content">
              <ul><li>Success Alert</li></ul>
            </div>
            <div class="alert__button">
              <button><i class="fas fa-check-circle"></i></button>
            </div>
          </div>
        </div>
      </div>
    `
  }
})