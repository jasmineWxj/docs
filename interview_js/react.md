# React 理解
## React 是什么
> React 是一个网页的 UI 框架，通过组建化的方式解决了视图层开发复用的问题，本质是一个组件化框架

> 核心设计思路有三个 声明式 组件化 通用性

## React 为什么使用jsx
> jsx 是 javascript 的语法扩展

> 也可以使用 createElement，jsx 是 createElement的语法糖，结构更清晰，书写更简便
> 
>jsx代码 最终都会通过 babel 还原成 createElement 代码

## React 生命周期坑
在不恰当的时期调用不恰当的代码
需要调用时 却没有调用

## 类组件 函数式组件

## 虚拟DOM

### 虚拟DOM 一定 比真实DOM 性能更高吗？

>  大量的直接操作DOM 容易引起网页的性能下降，这时候 react 基于虚拟DOM的diff 处理操作，可减少DOM 的操作范围和频率，提升页面的性能

> 首次的渲染 和 少量的DOM 虚拟DOM 会比较慢

# 第一章面试
https://xiaochen1024.com/series/60b1b600712e370039088e24/60b1f0ac401096003f2635dd

## jsx 和 fiber 有什么关系
> 在源码中 可以分为 mount 和 update ，mount 就是首次渲染的时候 ，这个时候我们就可以通过 jsx 来生成 jsx 对象，在 update 的时候，我们可以 通过最新状态的jsx 来 跟当前 fiber 对象对比形成 新的 fiber 对象

## 在 react17 之前为什么要声明 `import React from 'react'` 之后为什么不需要了

> 因为之前版本的 react 可以通过 babel 将 jsx 转换成 CreateElement，如果不引入react 就会报错

> 之后因为改变了react 的编译方式

## Fiber 是什么 为什么能提高性能

> 

## hooks

### 为什么 hooks 不能写在条件判断中

> 如果写了多个 hooks，在源码中 hooks 会创建一个链表，如果写在 了条件判断中，链表中的一些 hooks 可能顺序就不对了

## react 设计理念

### 异步可中断

* react15 慢在哪里
   react15 之前协调过程时同步的，也叫 stack reconciler，有因为 js的执行是单线程的，这就导致了更时时比较耗时的任务，不能及时响应一些高优先级的任务，比如用户的输入，所以页面就会卡顿

* 解决方案
    首先我们可能会将任务分离，让他能够被中断，当其他任务到来的时候让出执行权，当其他任务执行后，再从之前中断的部分开始异步执行身下的计算
* 实现

    在刚刚的解决方案中提到了任务分割，和一步执行，并且能狗让出执行权，由此可以带出react 的三个概念
    1. Fiber react15 的更新时同步的，因为他不能将任务分割所以需要一套数据结构既能对应真实dom，又能作为分割的单元

