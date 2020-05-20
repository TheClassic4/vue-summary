### vue项目目录结构详解
基于 vue.js 的前端开发环境，用于前后端分离后的单页应用开发

├── build // 构建脚本目录
│ ├── build.js // 生产环境构建脚本
│ ├── utils.js // 构建相关工具方法
│ ├── webpack.base.conf.js // wabpack基础配置
│ ├── webpack.dev.conf.js // wabpack开发环境配置
│ └── webpack.prod.conf.js // wabpack生产环境配置

├── config // 项目配置
│ ├── dev.env.js // 开发环境变量
│ ├── index.js // 项目配置文件
│ └── prod.env.js // 生产环境变量

├── src // 源码目录
│ ├── main.js // 入口js文件
│ ├── app.vue // 根组件
│ ├── components //公共组件目录
│ │ └── title.vue
│ ├── assets // 资源目录，这里的资源会被wabpack构建
│ │ └── images
│ │ └── logo.png
│ ├── routes // 前端路由
│ │ └── index.js
│ ├── store // 应用级数据（state）
│ │ └── index.js
│ └── views // 页面目录

├── static // 纯静态资源(不会被webpack构建)

├── index.html // 入口页面

├── package.json // npm包配置文件，里面定义了项目的npm脚本，依赖包等信息

├── package-lock.json // npm版本大于v5.0.0(?)的时候，在有package.json的情况下npm install会自动生成，用于锁定依赖模块版本号

