# React 生命周期

## react16 版本之后有三个生命周期被废弃

1. componentWillMount
2. componentWillReceiveProps
3. componentWillUpdate
   
### 原因
> 在 componentWillMount 进行异步数据请求，能使数据返回的更快，但是，componentWillMount 结束后 ，render 会立即触发，但此时 componentWillMount 中的数据可能还没有请求回来，一旦结果返回 会重新render，这会导致服务端渲染场景下的冗余请求等额外问题，得不偿失

## 新的生命周期
```javascript
constructor()

static getDerivedStateFromProps(props, state)

shouldComponentUpdate()

render()

componentDidMount()

static getSnapshotBeforeUpdate(prevProps, prevState)

componentDidUpdate()

componentWillUnmount()
```
### getDerivedStateFromProps
getDerivedStateFromProps是一个静态函数,也就是这个函数不能通过this访问到class的属性
需要注意的是，如果props传入的内容不需要影响到你的state，那么就需要返回一个null，这个返回值是必须的，所以尽量将其写到函数的末尾
> getDerivedStateFromProps生命周期函数,可以把父组件穿过来的props值转换为state,存起来

父组件
```javascript
const obj={
    name:'章三'
}
root.render(
    <Updata pro={obj}/>
);
```
子组建
```javascript
import React, { useEffect, useState } from 'react';

class Updata extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'章三'
        }
    }
    static getDerivedStateFromProps(props, state) {
        // 第一个值传过来的props
        // 第二个时state
        if (props.pro.name == state.name ){
            // 这里我们就可以做判断 是否渲染，返回的是state
            return {
                name:'red'
            }
        }
        return null
       
    }
    render(){
        return <div>
        </div>
    }
}

export default Updata
```

[![x5Mbwj.md.png](https://img-blog.csdnimg.cn/6af2403790594bdeb5f8803f063a38dc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhbmduYW4zMTU=,size_16,color_FFFFFF,t_70)](生命周期)

## 挂载
```javascript
class Updata extends React.Component{
    constructor(props){
        super(props)
        console.log('constructor');
    }

    componentDidMount(){
        console.log('挂载');
    }
    componentDidUpdate(){
        console.log('更新');
    }
    render(){
        console.log('render');
        return <div>
        </div>
    }
}
```
输出结果：
constructor
render
挂载

## 更新
```javascript
class Updata extends React.Component{
  
    constructor(props){
        super(props)
        this.state = {
            num: 1,
        }
    }
    static getDerivedStateFromProps(props, state) {
        return null
    }
    componentDidMount(){
        console.log('挂载');
    }
    componentDidUpdate(){
        console.log('更新');
    }
    shouldComponentUpdate(nextProps, nextState){
        // nextProps: 变化后的属性;
        // nextState: 变化后的状态;
        // 可以根据 shouldComponentUpdate 来判断是否更新 渲染，增加页面的性能
        if (nextState.num === 5){
            // 当num 为5 的时候 不渲染页面
            return false
        }
        console.log('should');
        return true
    }
    add = () =>{
        this.setState({
            num: this.state.num +=1
        })
    }
    render(){
        console.log('render');

        return <div>
            <div>{this.state.num}</div>
            <button onClick={this.add}>add</button>
        </div>
    }
}
```
输出
should
render
更新