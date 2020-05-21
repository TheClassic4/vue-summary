### 手写Promise对象
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。 
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```
const promise = new Promise(function(resolve, reject) { });
```


```
function Promise(executor) {
  this.state = 'pending';
  this.value = undefined;
  this.reason = undefined;
  
  function resolve(value) {
  
  }
  
  function reject(reason) {
  
  }
}

module.exports = Promise;
```
每一个Promise实例都有一个then方法，它用来处理异步返回的结果
```
Promise.prototype.then = function (onFulfilled, onRejected) { 

};
```
当我们自己实例化一个Promise，其执行器函数（executor）会立即执行，这是一定的
```
let p = new Promise((resolve, reject) => {
  console.log('执行了')；
});
```

```
function Promise(executor){
  const _this = this;
  this.state = 'pending';
  this.value = undefined;
  this.reason = undefined;
  
  executor(resolve, reject);
  
  function resolve(value) {}
  function reject(reason) {}
}
```
已经成功态或是失败态不可再更新状态
```
function resolve(value) {
  if(_this.state === 'pending') {
    _this.value = value; 
    _this.state = 'resolved';
  }
}

function reject(reason) {
  if(_this.state === 'pending') {
    _this.reason = reason; 
    _this.state = 'rejected';
  }
}
```
then方法的基本实现
当Promise的状态发生了改变，无论是失败还是成功都会调用then方法
```
Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.state === 'resolved') {
        //判断参数类型，是函数执行之
        if (typeof onFulfilled === 'function') {
            onFulfilled(this.value);
        }

    }
    if (this.state === 'rejected') {
        if (typeof onRejected === 'function') {
            onRejected(this.reason);
        }
    }
};
```
代码写到这里似乎基本功能都实现了，可是还有一个很大的问题，目前此Promise还不支持异步代码，如果Promise中封装的是异步操作，then方法无能为力：
```
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }，500);
});

p.then(data => console.log(data)); //没有任何结果
```
运行以上代码发现没有任何结果，本意是等500毫秒后执行then方法，哪里有问题呢？原因是setTimeout函数使得resolve是异步执行的，有延迟，当调用then方法的时候，此时此刻的状态还是等待态（pending），因此then方法即没有调用onFulfilled也没有调用onRejected。

这个问题如何解决？我们可以参照发布订阅模式，在执行then方法时如果还在等待态（pending），就把回调函数临时寄存到一个数组里，当状态发生改变时依次从数组中取出执行就好了，清楚这个思路我们实现它，首先在类上新增两个Array类型的数组，用于存放回调函数：
```
function Promise(executor) {
    var _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFunc = [];//保存成功回调
    this.onRejectedFunc = [];//保存失败回调
    
    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            //依次执行成功回调
            _this.onFulfilledFunc.forEach(fn => fn(value));
            _this.state = 'resolved';
        }

    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            //依次执行失败回调
            _this.onRejectedFunc.forEach(fn => fn(reason));
            _this.state = 'rejected';
        }
    }.
}
```
这样当then方法执行时，若状态还在等待态（pending），将回调函数依次放入数组中：
```
Promise.prototype.then = function (onFulfilled, onRejected) {
    //等待态，此时异步代码还没有走完
    if (this.state === 'pending') {
        if (typeof onFulfilled === 'function') {
            this.onFulfilledFunc.push(onFulfilled);//保存回调
        }
        if (typeof onRejected === 'function') {
            this.onRejectedFunc.push(onRejected);//保存回调
        }
    }
    //其它代码略...
}
```
Promise处理异步代码的地方
