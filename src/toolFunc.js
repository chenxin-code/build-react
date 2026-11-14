let timer = null

// 防抖1
export function debounce1(fn, delay = 200) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入函数')
  }
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(function () {
    fn()
    clearTimeout(timer)
    timer = null
  }, delay)
}

// 防抖2
export const debounce2 = function (action, delay = 200) {
  function delayBounces() {
    let ctx = this,
      args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      action.apply(ctx, args)
    }, delay)
  }

  return delayBounces()
}
