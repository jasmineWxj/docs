# 数组扁平化

## flat
> flat 方法需要手动 写 需要扁平多少层

> 语法
```javascript
flat()
flat(depth)
```

```javascript
let arr = [[1, 2, [3, 4], 5], [6, 7, 8], [[9, 10, [1, 2, 3, [1]]], 11]];
// 默认扁平一层
console.log(arr.flat()); // log [ 1, 2, [ 3, 4 ], 5, 6, 7, 8, [ 9, 10, [ 1, 2, 3, [Array] ] ], 11 ] 
console.log(arr.flat(4)); // 四层 [1, 2,  3,  4, 5, 6,7, 8,  9, 10, 1, 2,3, 1, 11]
```

## 递归 + concat
> concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```javascript
let arr = [[1, 2, [3, 4], 5], [6, 7, 8], [[9, 10, [1, 2, 3, [1]]], 11]];
function list(params) {
    let lists = [];
    params.forEach(item => {
        // 判断是否是数组 是的话 递归 合并
        if (Array.isArray(item)) {
            lists = lists.concat(list(item))
        } else {
            lists.push(item)
        }
    });
    return lists
}
```