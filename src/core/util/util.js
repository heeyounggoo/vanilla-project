import { isObject, hasOwnProperty } from '@/core/util/helper'

export function assignObjectKeyValue (obj) {
  // TODO 동일 데이터 네임 조건처리 및 에러 표
  // if (data) Object.assign(this, data)
  if (!obj && !isObject(obj)) {
    return false
  }

  Object.keys(obj).forEach(key => {
    if (hasOwnProperty(this, key)) {
      console.error(key, 'has already defined. Please define another name')
      return false
    }

    this[key] = obj[key]
  })
}