---
title: CSS
date: 2021-08-12
sidebar: auto
---

CSS 是 Web 的编程语言。所有现代的 HTML 页面都使用 CSS 非常容易学。
::: tip 
本文档主要是梳理HTML中常用的概念
:::
本栏的主要内容如下：

## 绘制三角形
```css
.triangle{
    width:0;
    height:0;
    border-left:50px solid transparent;
    border-right:50px solid transparent;
    border-bottom:100px solid transparent;
}
```

## transition transform translate
| 属性 | 定义 |
|---|---|
| transition(过渡)  | 用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同   |
|transform（变形）|用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”|
|translate（移动）|translate只是transform的一个属性值，即移动。|
```css
 #box {
      height: 100px;
      width: 100px;
      background: green;
      transition: transform 1s ease-in 1s;
    }

    #box:hover {
      transform: rotate(180deg) scale(.5, .5);
    }

```
[css transition](https://juejin.cn/post/6844903615920898056)