---
title: 浏览器
date: 2021-08-11
sidebar: auto
---
::: tip
前端开发要深刻认识浏览器的工作原理才能更好的帮助我们优化项目的性能
:::

本栏的主要内容如下：
## 浏览器架构
- [浏览器架构](./framework.md)
- [浏览器工作原理](./work.md)
- [跨标签页通信](./tabcommunication.md)
- [两种路由模式](./hashhistory.md)
- [Worker种类](./worker.md)

## 浏览器解析HTML
1. DOMTree CSSOM</br>
遍历文档节点，生成DOM Tree，遇到script标签会立即解析脚本，停止解析文档（JS可能会改动DOM和CSS）</br>
浏览器的CSS parser 将CSS解析成style Rules(CSSOM 也是树形结构，CSS渲染和HTML渲染是同步进行的)
2. renderTree</br>
浏览器从DOM Tree的根节点开始遍历每个可见节点，并找到其适配的CSS样式应用，（中间包括样式计算，样式覆盖）
3. layout</br>
计算出每个渲染对象的位置和尺寸并将其安置在浏览器中正确的位置
4. painting</br>
浏览器遍历呈现树，并调用呈现器的paint方法，呈现在浏览器中。

[浏览器页面加载过程](https://juejin.cn/post/6844903829251555341#heading-8)