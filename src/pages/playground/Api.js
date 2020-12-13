import config from '@/assets/data/config.json5'
import types from '@/assets/data/types.json5'
import axios from 'axios'

const bindingData = {
  user: 'hee920'
}
const api = {
  types: [
    { name: 'typeForExpend', api: '/types', method: 'post', payload: types.typeForExpend },
    { name: 'typeForRevenue', api: '/types', method: 'post', payload: types.typeForRevenue }
  ],
  config: [
    { name: 'period', api: '/config', method: 'post', payload: config.period }
  ],
  user: [
    // { name: 'user', api: '/user', method: 'post', payload: config.users, loop: true },
    { name: 'user', api: `/user/${bindingData.user}`, method: 'get', payload: null },
    { name: 'user', api: `/user/${bindingData.user}`, method: 'put', payload: config.users[bindingData.user] }
  ]
}

const component = function () {
  // template
  const flattenTemplate = (arr, key) => {
    return `${arr.map((item, idx) => `<li data-name="${item.name}" data-api="${key}" data-index="${idx}" style="margin-bottom: 10px;"><strong>[${item.name}]</strong>method: ${item.method}, api: api${item.api}</li>`).join('')}`
  }
  const template = () => {
    return `
    <div class="app">
      <h2>API Test</h2>
      <ul class="api">
        ${Object.keys(api).map(key => flattenTemplate(api[key], key)).join('')}
      </ul>
    </div>
    `
  }

  // render
  const title = document.createElement('div')
  title.innerHTML = template()

  return title
}

const setEvent = function (eventType, selector) {
  // event
  const targets = [...document.querySelectorAll(selector)]
  console.log(document, eventType, selector, targets)
  // const isTarget = targets.includes(target)
  targets.forEach(item => {
    item.addEventListener(eventType, (e) => {
      const target = e.target.tagName === 'li' ? e.target : e.target.closest('li')
      console.log(target, target.dataset)

      const selectedApi = api[target.dataset.api][target.dataset.index]

      if (selectedApi.loop) {
        selectedApi.payload.forEach(item => {
          axios[selectedApi.method](`api${selectedApi.api}`, item)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        })
      } else {
        axios[selectedApi.method](`api${selectedApi.api}`, selectedApi.payload || null)
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
      }
    })
  })
}

export default async function () {
  await document.body.appendChild(component())
  await setEvent('click', '.api')
}