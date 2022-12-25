# 大文件上传
> 在前端 上传文件的时候，如果文件过大，我们就需要对上传的文件分片切割，然后逐一上传到后端，然后后端对文件 进行 append

* 首先来进行前端的操作

### 结构
```html
<!-- progress 进度条 可以设置 max 最大值 -->
    <progress value="0"></progress>
    <input type="file" id="videoUploader" value="上传视频">
    <button id="upLoadeButton">上传视频</button>
```
引入axios 
> <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

#### 首先我们先获取dom
```javascript
let progress = document.querySelector('progress')
let uploadFiles = document.querySelector('#videoUploader')
let btn = document.querySelector('#upLoadeButton')
// 添加常量
let fileSize = 0 // 文件初始化大小
let chunkSize = 1024 * 100 // 设置每次上传多大的文件
```

#### 绑定点击时间
```javascript
btn.addEventListener('click',async function(){
    let {files:[file]} = uploadFiles // 解构文件信息 包含 文件名字 大小 类型
    let {name ,size, type} = file
    progress.max= size // 给进度条设置最大值 ，也就是文件的大小
    let fileName = new Date().getTime() + '-' + '111' // 这里可以创建文件的名字
    // 增加 while判断 当初始化的值比 文件的总大小 小的时候，就执行，反之就证明文件已经上传完毕
    while(fileSize < size){
        // 将 传进来的文件进行分割 开始是截取 （0--1024 * 100） =》 （1024 * 100 =》 1024 * 100 + 1024 * 100 ）
        let fileChunck = file.slice(fileSize, fileSize + chunkSize)
        // 添加表单值 传给服务器
        let fd1 = createFormData({
            name,             // 文件名
            type,             // 类型
            size,             // 总大小
            fileName,         // 名字
            fileSize,         // 大小   
            file: fileChunck, // 文件内容
        })
        try {
            // 把添加 的值传到服务器
            const cc = await axios.post('http://localhost:6004/upload', fd1)
        } catch (error) {
            
        }
        // 增加初始化值
        fileSize += chunkSize
        // 进度条
        progress.value = fileSize
    }

})
// 添加文件函数
function createFormData({
    name,
    type,
    size,
    fileName,
    fileSize,
    file
}){
    let fd = new FormData();
    // 把值都添加进去
    fd.append('name', name)
    fd.append('type', type)
    fd.append('size', size)
    fd.append('fileName', fileName)
    fd.append('fileSize', fileSize)
    fd.append('file', file)
    return fd
}
```

### node

安装溢依赖
> npm init -y 初始化

> npm i express 

> npm i express-fileupload  处理file 对象

```javascript
const express =  require('express')
const bodyParesr = require('body-parser') // post 解析body
const uploader=require('express-fileupload') // 处理file 对象
const {
    extname, // 拿后缀
    resolve
} = require('path') 

const {
    existsSync, // 查看是否存在
    appendFileSync ,// 给文件添加内容
    writeFileSync // 创建文件
} = require('fs')

const app = express()
const PORT = 6004 // 端口号
// 处理 post请求
app.use(bodyParesr.urlencoded({extended:true}))
app.use(bodyParesr.json())
app.use(uploader())
// 静态资源
app.use('/', express.static('upload'))
// 跨域
app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','*')
    next()
})
// 路由
app.post('/upload',(req,res)=>{
    // 解构传过来的值
    const {
        name,
        type,
        size,
        fileName,
        fileSize,
        files
    } = req.body
    const {file} = req.files
    // 文件名字 + 后缀名
    const Name = fileName + extname(name)
    // 处理路径
    const filePath = resolve(__dirname, './upload/' + Name)
    // 当 fileSize 不为 0 是 ，证明文件已经上传了一部分
    if (Number(fileSize) !== 0){
        // 如果当前文件路径 不存在 证明 没添加过此文件 return出去
        // 可以给前端提示
        if (!existsSync(filePath)){
            res.send({
                msg: '文件不存在',
            })
            return
        }
        // 存在的话 就往文件里面append 内容
        appendFileSync(filePath, file.data)
        res.send({
            msg: 'http://127.0.0.1:6004/upload' + Name,
            code: 'shibai'
        })
    }else{
        // 如果 fileSize为 0 就证明文件没有被上传过 可以新增一个文件
        writeFileSync(filePath, file.data)
        res.send({
            msg: 'ok',
            code: 0
        })
    }
  
})

// 监听端口号
app.listen(PORT,()=>{
    console.log('server is running on   ' + PORT);
})
```

> https://www.bilibili.com/video/BV16B4y1q7ki/?spm_id_from=333.337.search-card.all.click&vd_source=5334fb816ec3086a0715393648b690db