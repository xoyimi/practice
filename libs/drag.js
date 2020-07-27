var params = {
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  flag: false,
}
//获取相关CSS属性
function getCss(o, key) {
  return document.defaultView.getComputedStyle(o, 'false')[key]
}

//拖拽的实现
function startDrag(bar, target, callback) {
  if (getCss(target, 'left') !== 'auto') {
    params.left = getCss(target, 'left')
  }
  if (getCss(target, 'top') !== 'auto') {
    params.top = getCss(target, 'top')
  }
  //o是移动对象
  bar.addEventListener('touchstart', (e) => {
    params.flag = true
    params.currentX = e.touches[0].pageX
    params.currentY = e.touches[0].pageY
  })

  document.addEventListener('touchend', () => {
    params.flag = false
    if (getCss(target, 'left') !== 'auto') {
      params.left = getCss(target, 'left')
    }
    if (getCss(target, 'top') !== 'auto') {
      params.top = getCss(target, 'top')
    }
  })

  document.addEventListener('touchmove', (e) => {
    if (params.flag) {
      var nowX = e.touches[0].clientX,
        nowY = e.touches[0].clientY
      var disX = nowX - params.currentX,
        disY = nowY - params.currentY
      target.style.left = parseInt(params.left) + disX + 'px'
      target.style.top = parseInt(params.top) + disY + 'px'

      if (typeof callback == 'function') {
        callback(
          (parseInt(params.left) || 0) + disX,
          (parseInt(params.top) || 0) + disY
        )
      }

      if (event.preventDefault) {
        event.preventDefault()
      }
      return false
    }
  }, { passive: false })
}
