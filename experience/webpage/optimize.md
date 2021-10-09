---
title: 前端优化
date: 2021-09-17
sidebar: auto
---
## 打包优化
1. code spliting optimization 设置splitChunks 
2. tree-shaking optimization 设置使用terserPlugin ，配置usedExports:true,sideEffects,css在loader中添加sideEffects为true
3. externals 外部依赖使用CDN
4. g-zip</br>
文件资源： 二进制，文本资源</br>
g-zip开启会造成服务器的IO压力，一般对js,css文件进行开启，因为是文本资源，像图片，是二进制资源不可以开启g-zip压缩

## 缓存优化
hash chunkhash contenthash</br>
（Last-Modified 和 If-Modified-Since）/（etag  和  if-none-match）
强缓存，协商缓存 

## 资源下载优化  
async defer 
preload prefetch

## dns 预加载
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




## 图片预加载，图片懒加载

## 长列表优化
window.scrollY 获取整个可视窗口上面的高度</br>
el.getBoundingClientRect().top 获取元素距离可视窗口上面的距离</br>
window.innerHeight 获取整个可视窗口的高度</br>

防抖节流</br>
1. window.scrollY > prevY(window.scrollY) 表示往下滑动
2. el.getBoundingClientRect().top <= window.innerHeight 加载下一页面的数据


## seo优化

[lighthouse](https://developers.google.com/web/tools/lighthouse)