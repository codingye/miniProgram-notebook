// pages/noteClass/noteClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNote:'',
    isInfo:'',
    isShow:true,
    avatar: '../../images/raw_1512446140.jpeg',
    username: 'yjq',
    noteClassList: [
      {
        img: "../../images/raw_1512446214.jpeg",
        title: "美食",
      },
      {
        img: "../../images/raw_1512446225.jpeg",
        title: "旅行",
      },
      {
        img: "../../images/raw_1512446234.jpeg",
        title: "汽车",
      },
      {
        img: "../../images/raw_1512446243.jpeg",
        title: "时尚",
      },
      {
        img: "../../images/raw_1512446251.jpeg",
        title: "科技",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tonoteEdit() {
    wx.navigateTo({
      url: '/pages/noteEdit/noteEdit',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
//   showMenu() {
//     if(this.data.isShow) {
//       this.setData({
//         isNote:'isClickMenu-note',
//         isInfo:'isClickMenu-info',
//         isShow:false
//       })
//     }else {
//       console.log(123);
//       this.setData({
//         isNote:'',
//         isInfo:'',
//         isShow:true
//       })
//     }
    
//   }
// ,
showMenu() {
  if (this.data.isShow) {
    this.setData({
      isShow:false
    })
  }else {
    this.setData({
      isShow:true
    })
  }
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  tonoteList(e){
    console.log(e);
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url:`/pages/noteList/noteList?title=${title}`,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})