import { handleNotWeappEnv } from "./taro-api"

/**
 * 仅在微信小程序环境下执行
 */
export const updateManager = () => {
  if (!handleNotWeappEnv()) {
    return false
  } else {
    const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()

    })
    updateManager.onUpdateFailed(function () {
      wx.showToast({
        title: '更新失败，请重新打开小程序',
        icon: 'none'
      })
    })
  }
}