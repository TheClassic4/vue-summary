### this
Vue html模版中有两种值的形式: **模板** **表达式**

模板: 格式为`{{...}}`,模板本身的类型，可以认为是字符串，但是可以被模板的解析器展开可以识别的内容

表达式: 可以执行的代码，所有方法和数据都省略`this`

```
<router-link :to="'+routerParams+'">{{}}</router-link>
...
export default {
  data() {
    return {
      routerParams: this.$route.params.type
    }
  }
  watch: {
    '$route' (to, from) {
      this.routerParams = to.params.type;
    }
  }
}
```

`:to`其实就是`v-bind:to`数据绑定的缩写，数据绑定后的值是表达式，所以，对于表达式，和JS写法一致，只是所有`this`全部被忽略

js中this指向的对象是只有被调用时才确定的
>`window`是js的全局对象，我们创建变量实际上是给window添加属性

1.如果一个函数中有this，但是没有被上一级对象调用（非strict下），this指向的就是window

2.如果一个函数中有this，这个函数被上一级对象所调用，那么this指向的就是上一级对象

3.如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层对象所调用，this指向的也是上一个对象
```
var o = {
  user: 'momo',
  fn:function() {
    console.log(this.user) // momo
  }
}
window.o.fn();
```
this指向最后实际调用它的对象，与上例不同，下例没有直接执行fn
```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```

### 构造函数中的this
```
function Fn() {
  this.user = "mina";
}
var a = new Fn();
console.log(a.user); // mina
```
这里之所以对象a可以点出user是因为new关键字可以改变this的指向，将这个this指向对象a（new关键字就是创建一个对象实力），a已经复制了一份Fn

### this遇到return
如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例
```
function fn()  
{  
    this.user = 'momo';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
```
```
function fn()  
{  
    this.user = 'momo';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
```
```
function fn()  
{  
    this.user = 'momo';  
    return 1;
}
var a = new fn;  
console.log(a.user); //momo
```
```
function fn()  
{  
    this.user = 'momo';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //momo
```
`null`是特殊情况
```
function fn()  
{  
    this.user = '追梦子';  
    return null;
}
var a = new fn;  
```
