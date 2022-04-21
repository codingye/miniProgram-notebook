// pages/noteEdit/noteEdit.js
import {request} from "../../utils/request"
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    show: false,
    sort:"选择分类",
    actions: [
      {
        name: '美食',
      },
      {
        name: '旅行',
      },
      {
        name: '汽车',
      },
      {
        name: '时尚',
      },
      {
        name: '科技',
      },
    ],
    noteContent:'',
    noteTitle:'',
    noteType:'选择分类',
    noteImg:'',

  },
  showAction(e) {
    console.log(e);
    this.setData({ show: true });
  },
 
  onSelect(event) {
    console.log(event.detail);
    let name = event.detail.name
    this.setData({ 
      noteType:name,
      show:false
    });
  },
  afterRead(event) {
    console.log(event);
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.cloud.uploadFile({
     cloudPath:`${new Date().getTime()}.png`,
     filePath:file.url
    })
    .then(res => {
       // 上传完成需要更新 fileList
       console.log(res);
       const  fileList = this.data.fileList;
       fileList.push({url: res.fileID });
       this.setData({ 
         fileList,
         noteImg:res.fileID
        });
    })
  },

  noteTitle(e) {
    console.log(e);
    this.setData({
      noteTitle:e.detail.value
    })
  },

  noteContent(e){
    console.log(e);
    this.setData({
      noteContent:e.detail.html
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  publish() {
    // let {userId,nickname} = wx.getStorageSync('userInfo')
    let userId = 20
    let nickname = 'yjq'
    request('POST','/note/publishNote',{
      noteContent: this.data.noteContent, 
      noteTitle: this.data.noteTitle,
      noteType: this.data.noteType,
      noteImg: this.data.noteImg,
      userId: userId,
      nickname: nickname
    }).then(res => {
      console.log(res);
      wx.redirectTo({
        url: '/pages/noteClass/noteClass',
      })
    }).catch(err => {

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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