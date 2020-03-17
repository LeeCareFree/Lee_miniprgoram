// pages/category/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地缓存中同步获取数据
    const Cates = wx.getStorageSync("cates");
    // 判断
    if (!Cates) {
      // console.log('111')
      this.getCates();
    } else {
      // 判断是否有旧的数据 定义数据过期时间 10s 改成 5min
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 使用未过期的旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rigthContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据方法
  async getCates() {
    // request({ url: "/categories" }).then((res) => {
    //   this.Cates = res.data.message;
    //   // 储存接口数据
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //   // 构造左侧的大菜单数据
    //   let leftMenuList = this.Cates.map(item => item.cat_name);
    //   // 构造右侧商品数据
    //   let rigthContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rigthContent
    //   })
    // })

    // es7 async await 发送请求
    const res = await request({ url: "/categories" });
    this.Cates = res;
    // 把接口的数据存到本地data
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(item => item.cat_name);
    // 构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    /*获取被点击元素的索引
      给data中的currentIndex赋值
      根据不同的索引来渲染右侧商品内容
    */ 
   const {index} = e.currentTarget.dataset;
   let rightContent = this.Cates[index].children;
   this.setData({
     currentIndex: index,
     rightContent,
     // 设置右侧scroll-view距离顶部距离
     scrollTop: 0
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