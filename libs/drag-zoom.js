//elt:拖拽缩放的目标对象
export default function (elt) {
    let left = 0,//elt位置
        top = 0,
        currentX = 0,//手指坐标
        currentY = 0,
        scale = 1,//缩放比例
        flag = false //拖拽开关

    //监听手指开始触摸or鼠标长按
    elt.addEventListener('pointerdown', (e) => {
        flag = true
        currentX = e.pageX
        currentY = e.pageY
    })

    //监听手指离开or
    document.addEventListener('pointerup', () => {
        flag = false

    })

    document.addEventListener('pointermove', (e) => {
        if (flag) {
            let nowX = e.clientX,
                nowY = e.clientY
            let disX = nowX - currentX,
                disY = nowY - currentY
            left = _getCss(elt, 'left')
            top = _getCss(elt, 'top')
            console.log(left)
            elt.style.left = parseFloat(left) + disX + 'px'
            elt.style.top = parseFloat(top) + disY + 'px'
            e.preventDefault()
        }
    }, {passive: false})


//_____________________________
    let store = {
        scale: 1
    };

// 缩放处理
    elt.addEventListener('touchstart', function (event) {
        let touches = event.touches;
        let events = touches[0];
        let events2 = touches[1];

        if (!events) {
            return;
        }

        event.preventDefault();

        // 第一个触摸点的坐标
        store.pageX = events.pageX;
        store.pageY = events.pageY;

        store.moveable = true;

        if (events2) {
            store.pageX2 = events2.pageX;
            store.pageY2 = events2.pageY;
        }

        store.originScale = store.scale || 1;
    });
    document.addEventListener('touchmove', function (event) {
        if (!store.moveable) {
            return;
        }

        event.preventDefault();

        let touches = event.touches;
        let events = touches[0];
        let events2 = touches[1];


        if (events2) {
            // 双指移动
            if (!store.pageX2) {
                store.pageX2 = events2.pageX;
            }
            if (!store.pageY2) {
                store.pageY2 = events2.pageY;
            }

            // 获取坐标之间的距离
            let getDistance = function (start, stop) {
                return Math.hypot(stop.x - start.x, stop.y - start.y);
            };

            let zoom = getDistance({
                    x: events.pageX,
                    y: events.pageY
                }, {
                    x: events2.pageX,
                    y: events2.pageY
                }) /
                getDistance({
                    x: store.pageX,
                    y: store.pageY
                }, {
                    x: store.pageX2,
                    y: store.pageY2
                });

            let newScale = store.originScale * zoom;
            // 最大缩放比例限制
            if (newScale > 3) {
                newScale = 3;
            }
            // 记住使用的缩放值
            store.scale = newScale;
            // 图像应用缩放效果
            elt.style.transform = 'scale(' + newScale + ')';

        }
    });

    document.addEventListener('touchend', function () {
        store.moveable = false;
        delete store.pageX2;
        delete store.pageY2;
    });

//_____________________________

//获取相关CSS属性
    function _getCss(element, key) {
        //如今使用document.defaultView 完全没必要 直接使用 getComputedStyle即可
        return document.defaultView.getComputedStyle(element, null)[key]
    }
}
