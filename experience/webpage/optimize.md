---
title: 前端优化
date: 2021-09-17
sidebar: auto
---
## 1 打包优化
1. code spliting optimization 设置splitChunks 
2. tree-shaking optimization 设置使用terserPlugin ，配置usedExports:true,sideEffects,css在loader中添加sideEffects为true
3. externals 外部依赖使用CDN
4. g-zip</br>
文件资源： 二进制，文本资源</br>
g-zip开启会造成服务器的IO压力，一般对js,css文件进行开启，因为是文本资源，像图片，是二进制资源不可以开启g-zip压缩

## 2 缓存优化
hash chunkhash contenthash</br>
（Last-Modified 和 If-Modified-Since）/（etag  和  if-none-match）
强缓存，协商缓存 

## 3 资源下载优化  
async defer 
preload prefetch

## 4 dns 预加载
浏览器缓存 - 系统缓存 - 路由器缓存 - ISP DNS缓存 - 递归搜索</br>
```html
//用meta信息来告知浏览器, 当前页面要做DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on">
//在页面header中使用link标签来强制对DNS预解析: 
<link rel="dns-prefetch" href="//www.zhix.net">
```
资源预加载：`<link rel="prefetch" href="test.css">`</br>
DNS预解析： `<link rel="dns-prefetch" href="//haitao.nos.netease.com">`</br>
http预连接：`<link rel="prefetch" href="//www.kaola.com">` 将建立对该域名的TCP链接</br>
页面预渲染：`<link rel="prerender" href="//m.kaola.com">` 将会预先加载链接文档的所有资源</br>

## 5 图片预加载，图片懒加载

## 6 长列表优化
window.scrollY 获取整个可视窗口上面的高度</br>
el.getBoundingClientRect().top 获取元素距离可视窗口上面的距离</br>
window.innerHeight 获取整个可视窗口的高度</br>

防抖节流</br>
1. window.scrollY > prevY(window.scrollY) 表示往下滑动
2. el.getBoundingClientRect().top <= window.innerHeight 加载下一页面的数据


## 7 seo优化

[lighthouse](https://developers.google.com/web/tools/lighthouse)

## 8 回流重绘的优化
[重排重绘](https://juejin.cn/post/6844904083212468238)</br>
[优化](https://juejin.cn/post/6844903574091071495)</br>
避免回流和重绘</br>
css </br>
- 将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。
- 避免使用CSS表达式，可能会引发回流。
- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。
- CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

JavaScript</br>

- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。