>`vue-cli3`脚手架搭建完后，项目目录中没有`vue.config.js`需要手动创建

Css相关配置

```
moudle.exports = {
  css: {
    // 将组件内的css提取到一个单独的css文件（用于生产中），也可以传递给`extract-text-webpack-plugin`
    extract: true,
    
    sourceMap: false,
    
    // 为预处理器的loader传递自定义选项。比如传递给
    // css-loader时，使用`css: { ... }`
    loaderOptions: {
      css: {
      // css-loader
      },
      postcss: {
      // postcss-loader
      }   
    },
    
    //为所有的css及预处理文件开启css moudle，此选项不会影响`*.vue`文件
    modules: false
  }
}
```
css.modules
> Type: boolean  
Default: false  
默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。  
设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块

css.extract
> Type: boolean | Obeject  
Default: 生产环境下是true，开发环境下是false
是否将组件中的css提取至一个独立的CSS文件中（而不是动态注入到JavaScript中的inline代码）

支持的loader有
> css-loader  
postcss-loader  
sass-loader  
less-loader  
stylus-loader

```
css: {
  modules: false,
  loaderOptions: {
    postcss: {
      plugins: [
        require('postcss-pxtorem')({
          rootValue: 75,
          exclude: /(node_module)/,
          minPixelValue: 12,
          propList: ['*'],
          unitPrecision: 5,
        })
      ]
    }
  }
}
```
index.html中
```
<script>
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
  window.addEventListener('resize', () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10  + 'px';
  });
</script>
```
