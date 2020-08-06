
import Axios from "axios"
import wx from 'jweixin-module'
export default function (title, desc, link, imgUrl, cb) {
    if (navigator.userAgent.indexOf('MicroMessenger') === -1) {
        console.log('非微信网页环境')
        return
    }
    //设置默认的分享标题、描述、网页、图片，以及分享成功后的回调
    const shareConfig = {
        title: title || '这里是分享标题',
        desc: desc || '这里是分享描述',
        link: link || 'http://hzjustdo.com/test',
        imgUrl: imgUrl || 'http://hzjustdo.com/logo.png'
    }
    //等待后台返回签名
    Axios({
        method: 'post',
        url: 'http://hzjustdo.com/getWxConfig',
        data: {url: encodeURIComponent(location.href.split('#')[0])}, //向服务端提供授权url参数，并且不需要#后面的部分
    }).then((res) => {
        //后台返回成功后，配置微信的API
        const wxConfig = res.data
        console.log(wxConfig)
        wx.config({
            debug: false,
            appId: 'wx391841a9e3800e7c', //公众号的唯一标识
            jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData', ],
            timestamp: wxConfig.timestamp, //接口返回签名的时间戳
            nonceStr: wxConfig.noncestr, //接口返回签名的随机串
            signature: wxConfig.signature, //接口返回签名
        })
        //处理验证成功后的信息
        wx.ready(() => {
          console.log('wx.ready')
            //播放背景音乐
            document.querySelector('#bgm')&&(let bgm = document.querySelector('#bgm'),bgm.play())
           if( document.querySelector('#audio')) document.querySelector('#audio').play()
            wx.updateTimelineShareData({ //分享到朋友圈
                title: shareConfig.title,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
            })
            wx.updateAppMessageShareData({ //分享给朋友
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
            })
        })
    })

}

