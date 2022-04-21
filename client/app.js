// app.js
App({
  onLaunch() {
    // // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.getStorage({
      key:'userInfo',
      success(res) {
        console.log(res);
        if(res.data === null) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },
      fail(err) {
        // consolse.log(err);
        wx.setStorage({
          key:'userInfo',
          data:null,
          success(res) {
            // console.log(res);
              wx.navigateTo({
                url: '/pages/login/login'
              })
          }
        })
      }
    })
  },
  globalData: {

  }
})
