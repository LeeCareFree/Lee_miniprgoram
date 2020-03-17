// pages/goods_list/index.js


import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true,
    },
    {
      id: 1,
      value: "销量",
      isActive: false,
    },
    {
      id: 2,
      value: "价格",
      isActive: false,
    }],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  async getGoodsList(){
    var res = await request({url: "/goods/search",data: this.QueryParams});
    // console.log(res)
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
 // 由子组件传递的标题点击事件 
  handleTabsItemChange(e){
    // 获取被点击的索引
    const {index} = e.detail;
    let {tabs} = this.data;
    // 修改原数组
    tabs.forEach((item,i) => i===index?item.isActive=true:item.isActive=false);
    // 赋值
    this.setData({
      tabs
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
    // 1.重置数组
    this.setData({
      goodsList: []
    }),
    // 重置页码
    this.QueryParams.pagenum = 1;
    // 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
      });
    }else{
      // 有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})