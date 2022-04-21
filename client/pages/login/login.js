// pages/login/login.js
import {$toast} from "../../utils/util"
import {request} from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userpwd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  usernameVal(e){
    console.log(e);
    this.setData({
      username:e.detail.value
    })
  },
  userpwdVal(e){
    console.log(e);
    this.setData({
      userpwd:e.detail.value
    })
  },
  login() {
    if(this.data.username === '' || this.setData.userpwd === '') {
      $toast('输入不能为空','error')
      return
    }
    request('POST','/users/userLogin',{
      username:this.data.username,
      userpwd:this.data.userpwd
    }).then((res) => {
      console.log(res);
      let data = res.data.data
      wx.setStorageSync('userInfo', data)
      $toast(res.data.mess,'success')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/noteClass/noteClass',
        })
      },1000)
    }).catch(err => {
      console.log(err);
    })
  }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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