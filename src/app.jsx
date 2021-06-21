import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.less'
import Taro from '@tarojs/taro'
import { getAiCourse } from './api'

const store = configStore()

class App extends Component {
  componentDidMount () {
    getAiCourse({
      cloudPatientDto: {
        openId: '',
        phone: '15557106128',
        name: '',
        idCard: ''
      },
      featureReqList:[{"featureId":"5fdc5402873905000103f59c"}]
    }).then(res => {
      console.log(res)
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
