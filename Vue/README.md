# HELLO
> 关于 vue插件 无法使用问题, 需要找到 谷歌插件的路径，`manifest.json` 修改这个文件下的 `persistent` 更改为true 即可
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

## component 和 watch 之间的区别
1. component 能完成的功能 watch 都能完成
2. watch 能完成的功能 component 不一定能完成，例如 watch 可以异步操作
3. 两个重要的小原则
   1. 所被Vue 管理的函数，最好写成 普通函数，这样this 的指向 才是 vm 或组件的实例对象
   2. 所有不被vue 管理的函数（定时器 回掉函数， ajax的 回掉函数）最好写成箭头函数，这样this 的指向 才是 vm 或组件的实例对象

## 条件渲染

1. v-if
   1. 写法
      1. v-if='表达式'
      2. v-else-if='表达式'
      3. v-else
   2. 适用于切换频率较低的场景
   3. 特点 不展示 dom元素直接被移除
   4. 注意 v-if v-else-ifv-else 不能被中断
2. v-showv-show
   1. 写法 v-show= '表达式'
   2. 适用于 频率较高的场景
   3. 特点 不展示的dom 不会被移除

## 列表渲染
1.  v-for= "item in list"

## key 值的作用
1. 虚拟dom 中 key 的作用
   1. key 是虚拟dom 的标识，当数据发生变化时，vue 会根据『新数据』 生成 新的「虚拟dom」
   2. 随后 vue 进行 「新虚拟dom」 与 「旧虚拟dom」 的差异比较，比较规则如下
2. 对比规则
   1. 旧虚拟dom 中找到与 新虚拟dom 中相同的 key
      1. 若虚拟dom 中 内容没变，直接用之前的真实dom
      2. 若虚拟dom 中 内容变了，则生成新的真实dom，随之替换页面的真实dom
   2. 旧的虚拟dom中没有找到 与 新虚拟dom 中相同的 key
      1. 创建新的真实dom，然后渲染到页面
3. 用 index 作为 key 可能会引发的问题
   1. 若对数据进行 逆序 添加 删除 等破环顺序的操作
      1. 会产生 没有必要的真实dom 渲染
   2. 如果结构中 包含输入类的dom
      1. 会产生 错误的dom 更新

## 数据检测
> vue 如果想增加一个 之前没有写过的 参数 渲染到页面上面 需要用到 set 方法，强制修改数组的方法 也可以使用此方法

```javascript
  <div id="root">
        <p>{{student.name}}</p>
        <p>{{student.age}}</p>
        <p>{{student.sex}}</p>

        <button @click="add">增加</button>
    </div>

    const vm = new Vue({
        el: '#root',
        data: {
            student:{
                name:'张三',
                age:'12'
            }
        },
        methods: {
            add() {
                // 两种方法
                // this.$set(this.student,'sex','nan')
                Vue.set(this.student, 'sex', 'nan')
            }
        },
    })
```

## 过滤 filters

1. 过滤器
   1. 定义：对要显示的数据进行特定的格式化后再显示（适用于一些简单的处理逻辑）
   2. 语法：
      1. 注册过滤器： Vue.filter(name,callback) 或者 new Vue{filters:{}}
      2. 使用过滤器 {{xxx | filters}}
   3. 备注：
      1. 过滤器也可以接受额外的参数，多个过滤器可以串联
      2. 并没有改变原来的数据，是产生新的对应数据

```javascript
   <p>{{massage | Vueslice}}</p>

  Vue.config.devtools = true
        Vue.filter('Vueslice',function(value){
            return '你好'
        })
        const vm = new Vue({
            el: '#root',
            data: {
                massage:'123'
            },
            filters:{
                slice(value){
                    console.log(value);
                    return value.slice(1)
                }
            }
        })
```

## 自定义指令

```javascript
    <div id="root">
        <input type="text" v-fbind v-model="name">
        <button @click="name++">{{name}}</button>
    </div>
    <script>
        Vue.config.devtools = true
        const vm = new Vue({
            el: '#root',
            data: {
                name:123
            },
            directives:{
                fbind:{
                    // 指令与元素成功绑定时（一上来）
                    bind(element,binding){
                        console.log(111);
                    },
                    // 指令所在元素被插入页面时
                    inserted(element, binding){
                        console.log(111);

                    },
                    // 指令所在模板被重新解析时
                    update(element, binding) {
                        // element.focus()
                        console.log(111);
                        
                    },
                }
            }
        })

    </script>
```

# VUE CLI

## props 值的定义

```javascript
// 组件之间 props 值是不允许 被更改的，我们可以 将值 声明给 data 里面的数据
export default {
  name: 'HelloWorld',
  data(){
    return{
      myName:this.name
    }
  },
  props: {
    msg: {
      type:String,
      required: true // 必要的
    },
    name:{
      type:Number,
      default:123,  // 默认值
    }
  }
}
```

## 组件自定义事件

### $emit
```javascript
// 父组件
<template>
  <HelloWorld  v-on:btn="demo"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    demo(value){
      console.log('demo', value);
    }
  }
}
</script>

// 子组件
<button @click="postbtn">按钮</button>

export default {
  name: 'HelloWorld',
  data(){
    return{
    }
  },
  props: {
  },
  methods:{
    postbtn(){
      this.$emit('btn',111)
    }
  }
}
```

### 传递函数的方式
```javascript
// 父组件
<template>
  <HelloWorld  :getbtn = "demo1"/>
</template>

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    demo1(value){
      console.log('demo1', value);
    }
  }
}

// 子组件 
<button @click="getbtn1">按钮</button>

export default {
  name: 'HelloWorld',
  data(){
    return{
      myName:this.name
    }
  },
  props: {
    getbtn:{
      type:Function,
    }
  },
  methods:{
    getbtn1(){
      this.getbtn(111)
    }
  }
}
```

## 全局事件总线

1. 一种组件之间通信的方式，适用于任意 组件 之间通信的方式
2. 安装全局事件总线

```javascript
  new Vue({
    beforeCreate({
         vue.prototype.$bus = this //安装全局事件总线 $bus就是当前的vm
         
    })
  })
```
3. 使用全局事件总线
   1. 接受数据： A 组件想接受 数据，则在 A组件中给$bus 绑定自定义事件， 事件的回掉 留在 A 组件自身
   ```javascript
   methods(){
    demo(data){

    }
   }
   mounted(){
    this.$bus.$on('XXX',this.demo)
   }
   ```
   2. 提供数据： this.$bus.$emit('XXX',数据)

4. 最好在 beforeDestroy 勾子中，用 $off 去解绑当前组件所用到了事件

## $nextTick
1. 语法 ： this.$nextTick(回掉函数)
2. 作用： 在下一次更新 dom 结束后执行其指定的回掉
3. 什么时候用：当改变数据后 要给基于更新后的 dom 进行某一些操作时，要在 nextTick所指定的 回掉函数中执行

## 动画 过度
1. 作用：在插入 更新 或者移除dom 时，在合适的时机给元素添加类名
2. 图示：
![avatar](https://v2.cn.vuejs.org/images/transition.png)
3. 写法
   1. 准备好样式
      1. 元素进入时的样式
         1. v-enter 起点
         2. v-enter-active 过程
         3. v-enter-to 终点
      2. 元素离开时的样式
         1. v-leave
         2. v-leave-active
         3. v-leave-to

## 插槽
1. 作用： 让父组件可以向子组件指定位置插入html 结构，也是一种组件之间的通讯方式
2. 分类：默认插槽 具名插槽 作用域插槽
3. 使用方式： 
   1. 默认插槽
```javascript
// 父组件
<Category>
    <div>html结构</div>
</Category>

// 子组件
<template>
    <div>
        <slot>插槽默认内容</slot>
    </div>
</template>
```
   2. 具名插槽
```javascript
// 父组件
<Category>
   <template v-slot="center">
        <div>结构一</div>
   </template>
    <template v-slot="footer">
        <div>结构二</div>
   </template>
</Category>

// 子组件
<template>
    <div>
        <slot name='center'>插槽默认内容</slot>
        <slot name='footer'>插槽默认内容</slot>
    </div>
</template>
```
   3. 作用域插槽
      1. 理解：数据在组件的自身，但是根据数据产生的结构需要使用者来决定
```javascript
// 父组件
  <CardList>
     <template v-slot="aaa">{{ aaa.game }}</template>
  </CardList>
// 子组件
<template>
    <slot :game="one"></slot>
</template>
```

# vuex
1. 概念： 专门在Vue 中实现集中式状态管理

## store
```javascript
// 该文件用于创建Vuex 中最为核心的 store
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

// 准备 actions -- 用于响应组件的动作
const actions = {
    jia:function(context,value){
        // console.log(context, value);
            context.commit('JIA', value)
    },
    jian(context, value){
        context.commit('JIAN',value)
    }
};
// 准备 mutations -- 用于操作数据
const mutations = {
    JIA(context, value){
        fetch('http://jasmines.cn:7001/getmd').then(response => response.json()).then(json => {
            console.log(json)
            context.num += value
        })
    },
    JIAN(context, value){
            context.num -= value
    }
}
// 准备state 用于存储数据
const state = {
    num:1
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

模版
```javascript
<template>
  <div>
    <h1>{{ $store.state.num }}</h1>
    <button @click="btn">点击加一</button>
    <button @click="jian">点击减一</button>
  </div>    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      num:1
    }
  },
  methods: {
    btn(){
      this.$store.dispatch('jia',this.num)
    },
    jian(){
      this.$store.dispatch('jian', this.num)
    }
  },

}
</script>
```

## mapState
```javascript
// vuex
const state = {
    num:1,
    name:'张三',
}
// 模板
<template>
  <div>
    {{ he }}
  </div>    
</template>

import {mapState,mapActions} from 'vuex'
computed:{
    ...mapState({he:'name'})
},
```

## mapActions

```javascript

<template>
  <div>
    {/* 传参数 */}
    <button @click="btn(1)">点击加一</button> 
  </div>    
</template>

import {mapState,mapActions} from 'vuex'


  methods: {
    // 调用btn commit jia
    ...mapActions({ btn:'jia'}),
  },
```

# 路由

# vue3

## setup两个注意的点
1. setup 执行的时机
   1. 在beforeCreate 之前执行，this 是undefined
2. setup的参数
   1. props:值为对象，包含：组件外部传入进来，且组件内部声明接受的属性
   2. context：
      1. attrs：值为对象，包含：组件外部传入进来，但是没有在props 中没有声明的属性，相当于 `this.$attrs`
      2. slots:接收到插槽里面的内容，相当于 `this.$slots`
      3. emit:分发自定义事件的函数，相当于 `this.$emit`
## 计算属性
```javascript
import {ref,reactive,computed} from 'vue'

setup(props) {
  const sex = reactive({
    name:'张三',
    age:12
  })
  // 简写
  const fullname = computed(()=>{
    return sex.name + sex.age
  })
  // 完整
   const fullname = computed({
    get(){
      return sex.name+ '-'+ sex.age
    },
    set(value){
      var nameArr = value.slice('-')
      sex.name = nameArr[0]
      sex.age = nameArr[1]
    }
   })
  return {
    fullname
  }
}
```

## API

### toRef
1.  作用:创建一个ref 对象，其value值指向另一个对象中的某一个属性
2.  语法: `const name = toRef(person,'name')`
3.  应用:要将响应式对象中的某一个属性单独提供给外部使用
4.  扩展:toRefs 与 toRef 功能相似，但是可以批量 创建多个ref对象 语法   ...toRef(person)

### shallowReactive 与shallowRef
1. shallowReactive:只处理对象最外层属性的响应式（浅响应式）
2. 与shallowRef: 只处理基本数据类型响应式，不进行对象类型的响应式
3. 什么时候使用：
   1. 如果有一个对象数据，结构比较深，但变化时只是外层变化

### readonly shallowReadonly
1. readonly 让一个响应式数据变成只读的
2. shallowReadonly 让一个响应式数据变成一个 浅只读
3. 使用场景 不希望数据 被改变