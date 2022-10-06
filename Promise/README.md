# promise

## 什么是宏任务与微任务

> 我们都知道js 是单线程，但是一些高耗时就带来的阻塞的问题，为了解决这个问题，js有两种解决任务的执行模式
> 同步模式和异步模式

> 在异步模式下 创建异步任务「主要认为宏任务与微任务」

| 宏任务         | 微任务 |
|-------        |------|
|setTimeout     | Promise.[ then/catch/finally | 
|setInterval    | | 
|script（整体代码块）|
### 如何理解script 

>世纪上如果同时存在两个script 代码块，会首先执行第一个script代码中的同步任务，如果这个过程中创建了微任务，并进入了微任务队列，第一个script 同步代码执行执行完之后，会首先去清空微任务队列，再去开启第二个script 代码块的执行

### 什么是EventLoop？
![图片名称](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/…plv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)  
