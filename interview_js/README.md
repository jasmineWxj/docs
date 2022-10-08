# 前端js面试
## 数据类型的判断
### typeof （可以检测基本数据类型）
````javascript
console.log(typeof {}); //object
console.log(typeof {}); //object
console.log(typeof null); //object
````

## 事件
### 什么是事件
> 事件是文档和浏览器窗口发生特定的交互瞬间，事件就发生了

* addeventlistener 监听事件
* 事件的类型分为两种： 事件捕获 事件冒泡
  * 事件捕获就是 由外向内，由事件发生的顶部开始，逐级往下查找，一直到目标元素。
  * 事件冒泡就是 从具体的目标节点触发，逐级向上传递，一直到跟节点。
* 事件流就是 事件触发的顺序

### 事件委托
> 事件委托 事件代理。利用事件冒泡，就是把子元素绑定到父元素上，如果子元素阻止了事件冒泡，那么事件代理就无法实现
> 好处 提高性能 ，减少事件的绑定
#### 阻止事件冒泡
> event.stopPropagation() .stop修饰符

````html
   <ul>
        <li>知否知否</li>
        <li>知否知否</li>
        <li>知否知否</li>
        <li>知否知否</li>
        <li>知否知否</li>
    </ul>
````
````javascript
    var ul = document.querySelector('ul')
    ul.addEventListener('click',function(e){
        console.log(e.target.style.backgroundColor);
        e.target.style.backgroundColor='pink'
    })
````
## javascript 的作用域和作用域链
> 作用域就是定义变量的区域，他有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域，以及嵌套作用域根据变量来进行变量查找。简单来说 函数内部为局部作用域，函数外部为全局作用域

> 作用域就是变量的可用范围，主要分为全局和局部

## 防抖 节流
> 防抖

> 节流

## 赋值 深拷贝 浅拷贝
### 普通数据类型 和 引用数据类型的 存储方式
> 普通数据类型会存在 栈 中
> 引用数据类型的名字 会存在 栈中，但是其中的数据会存在 堆中

### 赋值
````javascript
let person = { name: '彭于晏' }
let person1 = person

person1.name = '胡歌'
console.log(person1); // { name: '胡歌' }
console.log(person); // { name: '胡歌' }
````
> 此时是将person赋值给person1，而person1将名字改成了“胡歌”，所以内存中的数据发生了改变。
>
> 他们指向的是同一个地址，后者把前者的值给改变了

### 浅拷贝
!> hasOwnProperty() 方法用来检测一个属性是否是对象的自有属性，而不是从原型链继承的
````javascript
let person = {name:'彭于晏'}  
function shallowCopy(source){
    let newObj = {}
    for(var i in source){
        if(source.hasOwnProperty(i)){
            newObj[i]=source[i]
        }
    }
    return newObj
}
 
var person1 = shallowCopy(person)
person1.name='胡歌'

console.log("person",person); //{ name: '彭于晏' }
console.log("person1",person1);//{ name: '胡歌' }
````
> 此时两个值 就是 不一样的
> 
> 这就是 赋值和浅拷贝的区别
> 
> 浅拷贝 需要新创建一个对象，指向一个新的对象，而赋值是没有的
> 
> 浅拷贝 是只能拷贝一层，但是 如果 拷贝的对象是 一个多层的，就需要使用深拷贝

浅拷贝多层
````javascript
let person = { name: '彭于晏', hobby: ['运动', '唱歌', '游泳'] }
function shallowCopy(source) {
    let newObj = {}
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            newObj[i] = source[i]
        }
    }
    return newObj
}
var person1 = shallowCopy(person)
person1.name = '胡歌'
person1.hobby[1] = '吃饭'
console.log("person", person.hobby); //person [ '运动', '吃饭', '游泳' ]
console.log("person1", person1.hobby); //person1 [ '运动', '吃饭', '游泳' ]
````
> 此时 我们发现 person 的数组也是发生了改变

### 深拷贝
````javascript
function deepClone(obj1 = {}) {
    //判断判断是否是空值和 不是object 对象，否则，会 return obj1
    if (typeof obj1 == null || typeof obj1 !== 'object') {
        return obj1
    }
    let newObj;
    if (obj1 instanceof Array) {
        newObj = []
    } else {
        newObj = {}
    }
    for (let i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            newObj[i] = deepClone(obj1[i]) //这里调用递归函数，在上面会进行判断，和退出递归
        }
    }
    return newObj

}

let obj = {
    age: 30,
    name: '彭于晏',
    hobby: ['运动', '唱歌', '游泳']
}
let obj2 = deepClone(obj)
obj2.name = '胡歌'
obj2.hobby[1] = '吃饭'
console.log(obj2); //{ age: 30, name: '胡歌', hobby: [ '运动', '吃饭', '游泳' ] }
console.log(obj); //{ age: 30, name: '彭于晏', hobby: [ '运动', '唱歌', '游泳' ] }
````

## 数组
数组的方法

| 方法名         | 功能                       | 返回值       |  是否改变原数组     |
|---------------|---------------------------| ------------|-------------------|
| push()        | (在结尾)向数组添加一或多个元素                                    | 返回新数组长度|        Y          |
| unshift()     | 在开头)向数组添加一或多个元素                                     | 返回新数组长度|        Y          |
| pop()         | 删除数组的最后一位                                              | 返回被删除的数据|        Y          |
| shift()       | 移除数组的第一项                                                | 返回被删除的数据|        Y          |
| reverse()     | 反转数组中的元素                                                | 返回反转后数组 |        Y          |
| sort()        | 以字母顺序(字符串Unicode码点)对数组进行排序                        | 返回新数组|        Y          |
| splice()      | 在指定位置删除指定个数元素再增加任意个数元素 （实现数组任意位置的增删改) | 返回删除的数据所组成的数组|        Y          |
| concat()      | 通过合并（连接）现有数组来创建一个新数组                            | 返回合并之后的数组|        N          |
| join()        | 用特定的字符,将数组拼接形成字符串 (默认",")                        | 返回拼接后的新数组|        N          |
| slice()       | 裁切指定位置的数组                                              | 被裁切的元素形成的新数组|        N          |
| toString()    | 将数组转换为字符串                                              | 新数组|        N          |
| valueOf()     | 查询数组原始值                                                  | 数组的原始值|        N          |
| indexOf()     | 查询某个元素在数组中第一次出现的位置                               | 存在该元素,返回下标,不存在 返回 -1|        N          |
| lastIdexOf()  | 反向查询数组某个元素在数组中第一次出现的位置                         | 存在该元素,返回下标,不存在 返回 -1|        N          |
| forEach()     | 迭代) 遍历数组,每次循环中执行传入的回调函数                         | 无/(undefined)|        N          |
| map()         | (迭代) 遍历数组, 每次循环时执行传入的回调函数,根据回调函数的返回值,生成一个新的数组 | 有/自定义|        N          |
| filter()      | 迭代) 遍历数组, 每次循环时执行传入的回调函数,回调函数返回一个条件,把满足条件的元素筛选出来放到新数组中 | 满足条件的元素组成的新数组|        N          |
| every()       | (迭代) 判断数组中所有的元素是否满足某个条件 | 全都满足返回true 只要有一个不满足 返回false|        N          |
| some()        | (迭代) 判断数组中是否存在,满足某个条件的元素 | 只要有一个元素满足条件就返回true,都不满足返回false|        N          |
| includes()    | 判断一个数组是否包含一个指定的值 | 是返回 true，否则false|        N          |
| Array.from()  | 接收伪数组,返回对应的真数组 | 对应的真数组|        N          |
| find()        | 遍历数组,执行回调函数,回调函数执行一个条件,返回满足条件的第一个元素,不存在返回undefined | 满足条件第一个元素/否则返回undefined|        N          |
| findIndex()   | 遍历数组,执行回调函数,回调函数接受一个条件,返回满足条件的第一个元素下标,不存在返回-1 | 满足条件第一个元素下标,不存在=>-1|        N          |
| fill()        | 用给定值填充一个数组 | 新数组|        N          |
| flat()        | 用于将嵌套的数组“拉平”，变成一维的数组。 | 返回一个新数组|        N          |


## 字符串方法
````javascript
1、chartAt( )：返回在指定位置的字符；
2、concat( )：返回新的字符串**，将一个或多个字符串与原字符串连接合并
3、indexOf( )：检索字符串，返回第一次出现的索引，没有出现则为-1
4、lastIndexOf(searchValue[ fromIndex]) 返回从字符串尾部开始第一次出现的索引，没有则-1，fromIndex的值相对于从尾部开始的索引
5、split( )：返回一个以指定分隔符出现位置分隔而成的一个数组，数组元素不包含分隔符
6、substr( )：从起始索引号提取字符串中指定数目的字符；
7、substring( )：提取字符串中两个指定的索引号之间的字符；
8、toLowerCase( )：字符串转小写；
9、toUpperCase( )：字符串转大写；
10、valueOf( )：返回某个字符串对象的原始值； 
11、trim( )：删除字符串两边的空格；
12、trimeState 取出开始的空格
13、trimeEnd  去除末尾空格
14、includes(searchString[, position])返回boolean，判断一个字符串是否包含在另一个字符串中，从postition索引开始搜寻，默认0
15、slice( )：提取字符串片段，并在新的字符串中返回被提取的部分；
16、search(regexp)返回首次匹配到的索引，没有则-1，执行正则表达式和 String 对象之间的一个搜索匹配
17、toString()返回一个表示调用对象的字符串，该方法返回指定对象的字符串形式
18、trim()返回去掉两端空白后的新字符串 还有trimend trimstart
19、replace() 把指定的字符串替换成为别的字符
````

## this
> 在全局的情况下 this 指向 window
> 
> 普通函数调用 this 指向window，严格模式下 this 指向 undefined,自执行函数指向 window ，定时器 指向window
> 
> 在对象里面调用this ，this指向 函数的对象
> 
> 在构造函数以及类中的this，构造函数配合 new 使用, 而 new 关键字会将构造函数中的 this 指向实例化对象，所以构造函数中的 this 指向 当前实例化的对象
> 
> 箭头函数没有自己的 this，箭头函数的this在定义的时候，会继承自外层第一个普通函数的this


## 闭包
> 可以读取函数内部的变量
> 
> 闭包可以重用一个变量，且这个变量不会被污染的一种机制，这些变量始终保存在内存中，不会被垃圾回收机制处理
> 
> 闭包的缺点：由于闭包会把变量存在内存中，内存的消耗较大，所以不能乱用闭包，否则会造成页面的性能问题
> 
> 闭包的使用场景 防抖 节流

## 函数柯里化
> 把接受多个参数的函数变换成一个接受单一参数的函数

````javascript
// 简单的相加函数
var add = function (x,y) {
    return x + y
}
// 调用：
add(1,2)
​
// 柯里化以后
var add = function (x) { //柯里化函数(闭包)
    return function (y) {
        return x + y
    }
}
add(1)(2)
````

## new的原理

## 作用域
> 自由变量 ： 当前作用域外的变量都是自由变量，一个变量在当前作用域没有定义，但是被使用了，就会向上级作用域一层一层的查找，直到找到为止，如果全局作用域也没找到这个变量，就会报错，这个查找的过程就是作用域链
> 变量提升： 每一个var 声明的变量，function 声明的函数 都会有变量提升，let const 不存在变量提升

## js运行机制

### 为什么js 是单线程
> js 是单线程 与他的用途无关作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
js 事件循环
>
> js 执行过程中，会有很多任务，这些任务总体分为两种
> 1. 同步任务
> 2. 异步任务
> 需要注意的是，异步任务还分为 宏任务 微任务

### 同步任务与异步任务
> 单线程就是一次只能完成一件事，如果在同一时间有多个任务的话，这些任务就需要进行排队，前一个任务执行完才能执行下一个人物。但是如果一个任务执行事件过长，那么后面的任务就需要一直等待，这就会影响用户的体验

1. 同步任务：就是前一个任务执行完毕后，才开始执行下一个任务，程序的执行顺序与任务的执行顺序是一致的、同步的
2. 异步任务则完全不同，每一个任务 有单个或多个回调函数，前一个任务结束后，不是执行任务队列的下一个任务，而是执行回调函数

### 事件循环
同步任务 和异步任务 分别进入不同的执行场所，同步任务进入主线程，异步任务进入Event Table 并注册回调函数
执行过程
1. 所有的同步任务都在主线程上执行，形成一个执行栈
2. 遇到异步任务, 进入Event Table并注册回调函数; 等到指定的事件完成(如ajax请求响应返回, setTimeout延迟到指定时间)时，Event Table会将这个回调函数移入Event Queue
3. 当栈中的代码执行完毕，执行栈（call stack）中的任务为空时，主线程会先检查micro-task(微任务)队列中是否有任务，如果有，就将micro-task(微任务)队列中的所有任务依次执行，直到micro-task(微任务)队列为空; 之后再检查macro-task(宏任务)队列中是否有任务，如果有，则取出第一个macro-task(宏任务)加入到执行栈中，之后再清空执行栈，检查micro-task(微任务)，以此循环，直到全部的任务都执行完成

````javascript
// 微任务包括了 promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。
​
// 宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲染等。
````
<img src='/interview_js/img/20200821150103500.png' width='50%'>
<img src='/interview_js/img/20200821150047814.png' width='30%'>

## 浏览器缓存
### cookies，sessionStorage 和 localStorage 的区别?
1. cookie 大小不超过 4kb的小型文本数据，一般有服务端生成，可以设置失效时间，若没有设置失效时间，关闭浏览器 cookie 失效
2. localStorage 5M 或者是更大，永久有效 ，除非手动删除
3. sessionStorage 关闭浏览器及删除

## location、之lnavigator和history
location
> location 对象存储了当前文档位置（URL）相关的信息，简单地说就是网页地址字符串。使用 window 对象的 location 属性可以访问

history
> window 对象给我们提供了一个 history 对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中） 访问过的 URL。
> 
> history.back 可以后退一个网页
>
> history.go 可以前进后退 1前进 -1 后退
>
> history.forward  前进

## 如何让(a == 1 && a == 2 && a == 3)的值为true？
利用数据劫持(Proxy/Object.definedProperty)
````javascript
let a = new Proxy({},{
    i:1,
    get:function(){
        console.log(this);
        return ()=> this.i ++
    }
})
console.log(a == 1 && a == 2 && a == 3);
````

# es6+ 
## 新增特性
> 1. 新增块级作用域
> 2. 

## CommonJS规范和es6规范、
### 什么是common js
https://blog.csdn.net/m0_59075169/article/details/124371688?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166522333416782425191790%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166522333416782425191790&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-2-124371688-null-null.142^v52^js_top,201^v3^control_2&utm_term=CommonJS%E8%A7%84%E8%8C%83%E5%92%8Ces6%E8%A7%84%E8%8C%83&spm=1018.2226.3001.4187

https://blog.csdn.net/qq_54753561/article/details/122149197?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166519958116782414988890%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166519958116782414988890&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-122149197-null-null.142^v51^control_1,201^v3^control_2&utm_term=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95&spm=1018.2226.3001.4187