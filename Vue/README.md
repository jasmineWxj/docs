# HELLO
!> 关于 vue插件 无法使用问题, 需要找到 谷歌插件的路径，`manifest.json` 修改这个文件下的 `persistent` 更改为true 即可
## 引入cdn
> https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js
## 创建 vue 实例对象
````javascript
const vm = new Vue({
    el:'#root',
    data:{
        name:'北京'
    }
})
````
1. el 指定当前Vue 实例为哪个容器服务，
2. data 存储数据

## 指令语法
> v-bind: 可以给任何一个属性绑定动态值
````javascript
<a v-bind:href = url>111</a>
<a :href = url>111</a> // 简写
const vm = new Vue({
    el:'#root',
    data:{
        url:'https://www.baidu.com'
    }
})
````
## 双向数据绑定
只有 input 有数据双向绑定
> v-model

## el 的两种写法
第一种
````javascript
const vm = new Vue({
    el:'#root',
    data:{
        url:'https://www.baidu.com'
    }
})
````
第二种
````javascript
const vm = new Vue({
    data:{
        url:'https://www.baidu.com'
    }
})
vm.$mount('#root')
````

## data 的两种写法
第一种
````javascript
const vm = new Vue({
    data:{
        url:'https://www.baidu.com'
    }
})
````
第二种 (函数)
````javascript
const vm = new Vue({
    data:function() { 
        return {
            url:'https://www.baidu.com'
        }
    }
})
````

## 数据代理 defineProperty
````javascript
let number = 19
let person = {
    name:'zhangsan',
    sex:'男',
}
/**
 * @person 对象
 * @age 属性
 */
Object.defineProperty(person,'age',{
    // value:12,
    // enumerable:true, // 控制属性是否可以枚举
    // writable:true, // 控制属性是否可以被修改
    // configurable:true, //控制属性 可以被删除
    get:function(){ // 当有人读区到 person的age 属性时，get(getter) 函数就会被调用，且返回值就是 age
        return number
    },

    set(value){ // 当有人修改到 person的age 值时，set（setter）值就会被调用，且收到修改的参数
        number = value
        console.log('有人修改了',value);
    }
})
````

## Vue数据代理
1. vue 中的数据代理 通过vm 对象来代理data对象中属性的读写
2. 数据代理的好处 更加方便的操作data 中的属性
3. 基本原理 
   1. 通过 `Object.defineProperty` 把data 对象中的所有属性添加到vm 对象上
   2. 为每一个添加 vm 上的属性，都指定一个（getter，setter）


## 事件处理
基本使用 
1. 使用 ` v-on:xxx` `@xxx` 绑定事件，其中xxx 是事件者
2. 事件的回掉需要在 methods对象中，最终会在 vm 中
3. methods 中配置的函数，不要使用箭头函数，否则 this 就不是 vm


````javascript
<button v-on:click='show($event,666)'>点我</button>
<button @click='show($event,666)'>点我</button>

const vm = new Vue({
    el:'#root',
    data:{
        name:'1111',
    },
    methods:{
        show(){
            this.name = '1234'
            console.log(this.name);
        }
    }
})
````

## 事件修饰符
1. prevent 阻止默认事件
2. stop 阻止事件冒泡
3. once 事件只出发一次
4. captrue 使用事件的捕获模式
5. self event.target是当前操作的元素才是触发事件
6. passive 事件的默认行为立即执行无需等待事件回调执行完毕

## 键盘事件
### vue 中常用的按键别名
1. 回车 => enter
2. 删除 => delete
3. 退出 => esc
4. 空格 => space
5. 换行 => tab（特殊，配合keydown使用）
6. 上 => up
7. 下 => dowm
8. 左 => left
9. 右 > right

### vue未提供别名的按键，可以使用按键原本的key值绑定
### 系统修饰键（用法特殊）：ctrl、alt、shift、meta
1. 配合keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才会被触发
2. 配合keydown 使用：正常触发

````javascript
<input type="text" @keyup.enter="down">
````
## 计算属性 computed
1. 定义：需要用到的属性不存在，通过已有的属性计算出来
2. 原理：Object.defineProperty
3. get 函数什么时候执行
   1. 初次读取时会执行一次
   2. 当依赖的数据发生改变时会被再次调用
4. 优势 与methods 实现相比，内部有缓存机制，效率更高
````html
<input type="text" v-model="firstname">
<input type="text"  v-model="lastname">
<p>{{fullname}}</p>
````

````javascript
const vm = new Vue({
    el:'#root',
    data:{
        firstname:'张',
        lastname:'三'
    },
    methods:{
        name(){
            return this.firstname + this.lastname
        }
    },
    computed:{
        fullname:{
            // 当有人读区到fullname 时，会调用get
            // get什么时候调用
            // 1. 初次读取到fullname 值时
            // 2. 所依赖的数据发生变化
            get(){
                console.log('111');
                return this.firstname + this.lastname
            },
            // fullname 修改时触发
            set(value){

            }
        }
        // 简写 只存在 getter 的情况
        fullname:function(){
            return this.firstname + this.lastname
        }
    }
})
````

## 监听属性
1. 当监视属性发生变化的时候，会掉函数自动调用
2. 监视属性必须存在
3. 监视属性的两种写法
   1. new Vue 传入 watch配置
   2. 通过vm.$watch

````javascript
 const vm = new Vue({
    el:'#root',
    data:{
        ishot:true,
    },
    watch:{
        ishot:{
            immediate:true, // 初始化时让 handler 执行一次
            handler(newo,ld){
                console.log(newo,ld);
            }
        }
    }
})
````
````javascript
vm.$watch('ishot',{
    handler(aa,bb){
        console.log(aa,bb,'??');
    }
})
````

## 深度监听
1. vue 中的watch 默认不检测 对象内部的改变
2. 配置 deep 可以检测到对象内部的多层改变

````javascript
watch:{
    number:{
        deep:true,
        handler(aa,bb){
            console.log('number 更改');
        }
    }
}
````

### 简写方式
````javascript
watch:{
    ishot(aa,bb){
        console.log(aa,bb,'vv');
    },
}

vm.$watch('ishot',function(aa,bb){
    console.log(aa,bb,'vv');

})
````
