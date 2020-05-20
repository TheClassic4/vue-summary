手写Promise对象
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
function Promise(){
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
