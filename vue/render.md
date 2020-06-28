### v-for中数组变化不引起重新渲染
```
<div v-for="(item, index) in list">
  <div @click="changeContent(index)"></div>
  <div v-if="item.showContent"></div>
</div>

<script>
  changeContent(index) {
    this.list[index].showContennt = true; // 此处改变了list的值但是不会引起vue对dom的重新渲染
    
    Vue.set(list, index, { showContent : true }) // 使用Vue.set
  }
</script>
```

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue相同的效果，同时也将触发状态更新： 
// Vue.set Vue.set(example1.items, indexOfItem,newValue) 
// Array.prototype.splice example1.items.splice(indexOfItem,1, newValue) 
为了解决第二类问题，你可以使用 splice： example1.items.splice(newLength)

