import Taro, {
  getSystemInfoSync
} from '@tarojs/taro'

/**
 * 未完全列举所有环境变量，详情请看：
 * https://taro-docs.jd.com/taro/docs/apis/about/env#tarogetenv
 * ENV_TYPE.WEAPP 微信小程序环境
 * ENV_TYPE.WEB WEB(H5)环境
 */
export const getEnv = () => Taro.getEnv().toLocaleLowerCase()


/**
 * 获取系统信息
 * https://taro-docs.jd.com/taro/docs/apis/base/system/getSystemInfo
 * pixelRatio 设备像素比
 * platform 客户端平台
 * safeArea 安全区域
 * screenHeight
 * screenWidth
 * statusBarHeight 状态栏高度
 * windowHeight
 * windowWidth
 */

export const getSystemInfo = params => {

  const systemInfo = getSystemInfoSync()

  if (params === undefined) {

    return systemInfo

  } else if (params && typeof params === 'string') {

    return systemInfo[params]

  } else {

    console.error('getSystemIno方法参数类型不正确')

  }
}


/**
 * 以下两个方法，为处理环境不匹配对情况，主要是对开发者作出提示
 */
export const handleNotWeappEnv = () => {
  if (getEnv() !== 'weapp') {
    console.info('您当前不是weapp环境')
    return false
  }
  return true
}

export const handleNotWebEnv = () => {
  if (getEnv() !== 'web') {
    console.info('您当前不是web环境')
    return false
  }
  return true
}


/**
 * 本地缓存
 */
export const saveCache = (...rest) => {
  if (!rest.length) {
    console.error('saveCache方法，参数不可为空')
  } else if (rest.length == 1 && typeof rest[0] === 'object' && !Array.isArray(rest[0])) {
    Taro.setStorageSync(Object.keys(rest[0])[0], Object.values(rest[0])[0])
  } else if (rest.length == 2) {
    let key = typeof rest[0] == 'string' ? rest[0] : JSON.stringify(rest[0])
    let val = typeof rest[1] == 'string' ? rest[1] : JSON.stringify(rest[1])

    Taro.setStorageSync(key, val)
  }
}


export const getCache = key => {
  let cache = Taro.getStorageSync(key)
  try {
    cache = JSON.parse(cache)
  } catch(e) {
  }
  return cache
}


export const deleteCache = key => {
  Taro.removeStorageSync(key)
}