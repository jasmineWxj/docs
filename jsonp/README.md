# JSONP 跨域原理解析

> 由于浏览器的同源策略的限制，非同源下面的请求都会出现 跨域问题，`JSONP` 就是其中的一个解决方案,其缺点就是只有 get 请求

> script标签的src还是img标签的src，或者说link标签的href他们没有被同源策略所限制，比如我们有可能使用一个网络上的图片，就可以请求得到

## JSONP 的跨域实现

jquery

```javascript
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

前端实现

```javascript

<button id="btn">点击</button>
// 点击按钮 添加script
$('#btn').click(function () {
    var sc = document.createElement('script');
    sc.src = 'http://localhost:4018/jsonp';
    $('body').append(frame);
});

function ccc(res) {
    console.log(res);
}

```

服务端node

```javascript
const express = require("express");
let app = express();
app.get('/jsonp', (req, res) => {
    let data = {
        message: '成功',
    }
    data = JSON.stringify(data)
    res.end('func(' + data + ')');
});
app.listen(3000, () => {
    console.log("服务器启动成功");
})
```

[![x5Mbwj.md.png](https://s1.ax1x.com/2022/10/29/x5Mbwj.md.png)](https://imgse.com/i/x5Mbwj)

我们也可以在地址上添加参数
```javascript
<script src='http://localhost:3000/jsonp?name=leo&age=30'></script>
```