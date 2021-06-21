module.exports = plop => {
  plop.setGenerator('pages', { // component 就是接下来的yarn plop命令后面带来指令名称
    description: 'create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name',
        default: 'MyPage'
      }
    ],
    actions: [
      {
        type: 'add', // 代表添加文件
        path: 'src/pages/{{name}}/index.jsx', // 要生成的文件路径
        templateFile: 'plop-templates/page.hbs' // 文件模板
      },
      {
        type: 'add', // 代表添加文件
        path: 'src/pages/{{name}}/index.scss',
        templateFile: 'plop-templates/index.scss.hbs'
      },
      {
        type: 'add', // 代表添加文件
        path: 'src/pages/{{name}}/index.config.js',
        templateFile: 'plop-templates/page.config.hbs'
      },
    ]
  })
  plop.setGenerator('components', { // component 就是接下来的yarn plop命令后面带来指令名称
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent'
      }
    ],
    actions: [
      {
        type: 'add', // 代表添加文件
        path: 'src/components/{{name}}/index.jsx', // 要生成的文件路径
        templateFile: 'plop-templates/page.hbs' // 文件模板
      },
      {
        type: 'add', // 代表添加文件
        path: 'src/components/{{name}}/index.scss',
        templateFile: 'plop-templates/index.scss.hbs'
      }
    ]
  })
}