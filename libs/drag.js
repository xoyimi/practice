//拖拽的实现
export default function startDrag(bar, target, callback) {
    let left = 0,
        top = 0,
        currentX = 0,
        currentY = 0,
        flag = false


    if (_getCss(target, 'left') !== 'auto') {
        left = _getCss(target, 'left')
    }
    if (_getCss(target, 'top') !== 'auto') {
        top = _getCss(target, 'top')
    }
    //o是移动对象
    bar.addEventListener('pointerdown', (e) => {
        flag = true
        currentX = e.pageX
        currentY = e.pageY
    })

    document.addEventListener('pointerup', () => {
        flag = false
        if (_getCss(target, 'left') !== 'auto') {
            left = _getCss(target, 'left')
        }
        if (_getCss(target, 'top') !== 'auto') {
            top = _getCss(target, 'top')
        }
    })

    document.addEventListener('pointermove', (e) => {
        if (flag) {
            let nowX = e.clientX,
                nowY = e.clientY
            let disX = nowX - currentX,
                disY = nowY - currentY
            target.style.left = parseInt(left) + disX + 'px'
            target.style.top = parseInt(top) + disY + 'px'
            e.preventDefault()
        }
    }, {passive: false})
}

//获取相关CSS属性
function _getCss(element, key) {
    //如今使用document.defaultView 完全没必要 直接使用 getComputedStyle即可
    return document.defaultView.getComputedStyle(element, null)[key]
}
