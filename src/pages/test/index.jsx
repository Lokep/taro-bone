import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class test extends Component {
  render() {
    return (
      <View className="container">
        <h1>test Page</h1>
      </View>
    )
  }
}