const fs = require('fs')

let config = getConfig()
let dir = fs.readdirSync('src/pages/', 'utf-8')
config = setUpConfig(dir, config)
setConfig(config)



function getConfig () {
  let config = fs.readFileSync('src/app.config.js', 'utf-8')
  return config
}

function setUpConfig (dir , config) {
  dir.unshift(dir.splice(dir.findIndex(item => item == 'index'), 1))
  let pages = "pages: ['" + dir.map(item => `pages/${item}/index`).join("','") + "']"
  let pageStart =  config.indexOf('pages'), pageEnd = config.indexOf(']')
  config = config.slice(0, pageStart) + pages + config.slice(pageEnd + 1)
  return config
}

function setConfig (config) {
  fs.writeFile('src/app.config.js', config, err => {
    if (err) console.error('app.config写入错误', err)
    console.log('保存成功')
  })
}
