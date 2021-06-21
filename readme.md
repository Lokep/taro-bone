##  前期准备

* node 环境（>=12.0.0）
* React、Redux  
  + [Taro 支持使用 React 进行开发，但和在浏览器中使用 React 稍有不同](https://taro-docs.jd.com/taro/docs/react)
  + [使用 Redux](https://taro-docs.jd.com/taro/docs/redux)
* 微信小程序
  + [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
* React Native
  + [React Native 端开发流程](https://taro-docs.jd.com/taro/docs/react-native/)
  + [RN demo](https://github.com/wuba/Taro-Mortgage-Calculator)

## 创建项目

* 全局安装 `taro`

  

```bash
  npm install -g @tarojs/cli
```

* 初始化项目

  

```bash
  taro init <project-name>
  ```

  [taro 文档：安装及使用](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)

  > 安装依赖会需要一些时间

## 项目结构

| - -  [.editorconfig](/.editorconfig)  
  | - -  [.eslintrc.js](/.eslintrc.js)  
  | - -  [.gitignore](/.gitignore)  
  | - -  [babel.config.js](/babel.config.js)  
  | - -  config  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [dev.js](/config/dev.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.js](/config/index.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [prod.js](/config/prod.js)  
  | - -  [package.json](/package.json)  
  | - -  [project.config.json](/project.config.json)  
  | - -  [project.tt.json](/project.tt.json)  
  | - -  [readme.md](/readme.md)  
  | - -  src  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  actions  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [counter.js](/src/actions/counter.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [app.config.js](/src/app.config.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [app.jsx](/src/app.jsx)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [app.less](/src/app.less)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  constants  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [counter.js](/src/constants/counter.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.html](/src/index.html)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  pages  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  index  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.config.js](/src/pages/index/index.config.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.jsx](/src/pages/index/index.jsx)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.less](/src/pages/index/index.less)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  reducers  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [counter.js](/src/reducers/counter.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.js](/src/reducers/index.js)  
  | &nbsp; &nbsp; &nbsp; &nbsp; | - -  store  
  | &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; | - -  [index.js](/src/store/index.js)  
  | - -  [yarn.lock](/yarn.lock)  

  其中主要需要留意的是 `config` 和 `src` 目录中的内容，

## 编译   

编译指令由 `package.json` 可见，主要会使用到的有以下几类

  + dev:h5
  + dev:rn
  + dev:weapp
  + build:weapp
  + build:h5
  + build:rn
  
分别为 `微信小程序` ， `h5` ， `react native` 的编译和打包指令。

输出模式，在项目搭建的时候，已经修改过了，目前也是支持多端同步开发调试的，   
例如，同时开启微信小程序与h5，使用两个终端，调用对应的指令即可。

## 开发

### 公共方法

  #### request
  是基于Taro.request二次封装的

  #### update-manager
  小程序环境下，检测更新使用

  #### proxyTable 
  用于配置接口代理，为了同时兼容h5和小程序，没有有使用config中的方式

  
  #### isWebViewUrl、validIdcard 等公共方法

  #### plop 新建页面组件
  由于微信开发者工具使用起来不是特么方便，而且在多端同时开发等时候，很多同学都会选择 `vscode` 作为开发工具，但是小程序新增页面又比较麻烦，所以新增了一个模板工具 `plop` 。
`plop` 这个工具，或许听起来有些陌生，但是又是潜伏在我们周围，在我们都运营后台项目中脚手架(vue-element-admin)中就包含了这个工具。
  在当前项目中的使用方法： 

  

```bash
    yarn plop
  ```

  或
  

```bash
    npm run plop
  ```

  然后跟着指示操作即可。
  这部分模板工具，各位同学可以自己根据plop-templates目录下的模板脚本等进行自定义开发，但是改造后，请添加到 `.gitignore` 文件中，就不必提交到gitlab了。

### 静态资源

为了有效控制小程序和app包的体积，静态资源一般托管于OSS上，记得配置小程序的合法域名

### 代码规范

  
  1. 常量如果需要抽离出来定义时，统一定义在`constant`目录下；
  
  2. 接口代理，统一在`utils/proxyTable`中定义，注意：需区分`develpment`, `trial`, `release`三个环境；
  
  3. 接口方法，统一在 `api` 目录下，接口文件名应与模块、页面对应，接口方法需要注释说明；

  4. 项目中开启了`eslint`, 配合`husky`在`pre-commit`的时候，会进行校验。
  
  5. `Taro` api使用的时候，需要查看该api在多端的支持情况，如下所示
  

### 协作流程  

  公共方法，全局样式，一般不建议修改；
  

### 提交规范

  分支命名需要规范，
   - 版本迭代： dev-[${version}]  
   - 功能迭代： feature-[${developer}]-[${date}]-[${feature}]  
   - 修复bug：  hotfix-[${developer}]-[${date}]-[${bug}]  
   - 提交测试： test-[${version}]  

  commit信息 理想状态 参考：[Angular提交信息规范](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

> 原则上不允许直接在master直接修改内容

### 文档规范

  相关文档汇总地址, 技术文档统一于 `docs` 目录下管理，命名 [${date}]-[${name}].md
