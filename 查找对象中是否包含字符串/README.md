# 在一个多维数组 或 对象 中，给一个指定的值，判断这个值是否在 这个 数组或 对象中

在面试的过程中经常会被问答到的问题，我们首先想到的方式也是最简便的方式就是递归查找

需要查找的对象
```javascript
let obj = {
    age: 30,
    name: '彭',
    hobby: ['运动', '唱歌', '游泳', {
        bane: '122e',
        nasd: {
            asdn: {
                adsa: {
                    size: 12
                }
            }
        }
    }],
    app: {
        names: 'wangxiaoj'
    }
}
```
我们要在 这个对象中是否包含值为`12 `

```javascript
function objDeep(params = {},number) {
    // 首先我们判断传进来的值 是否为 对象 数组，若不是 return 
    if (typeof params !== 'object' || typeof params === null) {
        return 
    }
    // 遍历 对象 数组
    for (let i in params) {
        // 若对象 数组 的值 存在 number 证明 存在 次值 直接 return，此次查找成功
        if (params[i] === number) {
            console.log('成功', params);
            return
        // 若 不存在 且 值 还是 一个 对象 或者 数组 ，再次调用 objDeep函数
        } else if (params[i] instanceof Array || params[i] instanceof Object) {
            objDeep(params[i],number)
        }
    }

}

objDeep(obj,12)
```