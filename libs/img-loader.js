/**
 * @param images 要加载的图片地址列表，['aa/asd.png','aa/xxx.png']
 * @param callback 每成功加载一个图片之后的回调，并传入“已加载的图片总数/要加载的图片总数”表示进度
 * @param timeout 每个图片加载的超时时间，默认为3s
 */
export default function imgLoader(images, callback, timeout) {
    timeout = timeout || 3000;
    images = Array.isArray(images) && images || [];
    callback = typeof (callback) === 'function' && callback;
    let total = images.length,
        loaded = 0;

// 图片序列预加载
    for (let i = 0; i < total; i++) {
        const img = new Image()
        img.src = images[i]
        img.onload = img.onerror = () => {
            loaded < total && (++loaded, callback && callback(loaded / total));
        }
    }
    //延时强制加载完成
    setTimeout(() => {
        loaded < total && (loaded = total, callback && callback(loaded / total));
        console.log('强制加载完成')
    }, timeout * total);
}
