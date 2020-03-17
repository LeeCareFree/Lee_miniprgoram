
export const request = (params) => {
    let header = {...params.header};
    if(params.url.includes("/my/")){
        // 拼接header 带上token
        header['Authorization'] = wx.getStorageSync('token');
    }
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    // 定义公共的url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (res)=>{
                resolve(res.data.message)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: () => {
                wx.hideLoading();
            }
        })
    })
}