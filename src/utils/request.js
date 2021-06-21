import Taro from '@tarojs/taro'
import { proxyTable } from './proxyTable'
import { getCache, handleNotWeappEnv, saveCache } from './taro-api'
import { env, wxLogin, appId } from './wx-api'

export const request = options => new Promise(resolve => {
  const {
    url,
    data,
    method = 'get',
    cache = false,
    timeout = 5000,
    useStore = false,
    contentType,
    showLoading = true,
    showMessage = true,
    checkToken = true,
    delay = 0
  } = options
  showLoading && Taro.showLoading({
    title: '加载中'
  })
  const t0 = Date.now();
  Taro.request({
    cors_mode: 'cors',
    credentials: 'include',
    header: handleHeader(contentType, url, checkToken),
    url: handleUrl(url),
    data,
    method,
    cache,
    timeout,
    useStore,
    success: async (res) => {
      showLoading && Taro.hideLoading()

      const t1 = Date.now();
      const delta = t1 - t0;

      handleDelay(delay, delta, handleResponse(res, showMessage, resolve))
      
    },
    fail(err) {
      showLoading && Taro.hideLoading()
      
      if (err == 'TypeError: Failed to fetch') {
        showMessage && Taro.showToast({
          title: '请求失败',
          icon: 'none'
        })
        return
      }
      let msg = err.statusText
      showMessage && Taro.showToast({
        title: msg,
        icon: 'none'
      })
      resolve(err)
    },
    complete() {
      showLoading && Taro.hideLoading()
    }
  })
})
export const fetch = request
export const axios = request

function handleHeader(contentType, url, checkToken = true) {
  let BASE_HEADER = {
    'Content-Type': 'application/json'
  }
  const { token = '' } = getCache('loginInfo') || {}

  if (
    contentType && 
    contentType.toLowerCase() === 'formdata'
  ) {
    BASE_HEADER = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  if (
    token && 
    checkToken && 
    url!='/paas-web/hospital/list-all' &&
    url.indexOf('login') < 0
  ) {
    BASE_HEADER.Authorization = 'Bearer' + token
  }

  return BASE_HEADER
}

function handleUrl(url) {
  const baseApi = handleProxyTable(url)
  
  if (url.indexOf('http') > -1) return url
  
  return baseApi[env] + url
}


function handleProxyTable(url) {
  for (let key in proxyTable) {
    if (!key) {
      console.error('[proxyTable.js]: 您的proxyTable配置不正确')
      break;
    }
    if (key === '*' || url.startsWith(key)) {
      return proxyTable[key]
    } 
  }
}

function handleDelay(delay, delta,fn) {
  if (delay && delta < delay) {
    let timeOut = setTimeout(() => {
      clearTimeout(timeOut)
      fn()
    }, delay - delta)
    return
  } else {
    fn()
  }

}

function handleResponse(res, showMessage, resolve) {
  const { msg = '请求出错' } = res.data
  return function() {
    if (res.data.res == 0) {
      resolve(res.data)
    } else {
      showMessage && Taro.showToast({
        title: msg,
        icon: 'none'
      })
      resolve(res.data)
    }
  }
}