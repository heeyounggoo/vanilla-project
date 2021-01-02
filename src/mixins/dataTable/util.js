function getItems (props, data) {
  const { totalVisible, page } = props
  const { pageCount } = data

  if (totalVisible === 0) return []
  const maxLength = Math.min(totalVisible, pageCount) // 최대 노출 갯수

  const left = Math.floor(maxLength / 2)
  const right = pageCount - left + 1

  if (maxLength === pageCount) {
    return range(1, pageCount)
  }

  if (page > left && page < right) {
    // left < page < right
    return [1, '...', ...range(page - 1, page + 1), pageCount]
  }

  if (page < left || page > right) {
    return [...range(1, left), '...', ...range(right, pageCount)]
  }

  if (page === left) {
    return [...range(1, left + left - 1), '...', pageCount]
  }

  if (page === right) {
    return [1, '...', ...range(right + left - 1, pageCount)]
  }
}

function range (from, to, step = 1) {
  return Array.from({ length: (to - from) / step + 1}, (_, i) => from + (i * step))
}

export {
  getItems
}