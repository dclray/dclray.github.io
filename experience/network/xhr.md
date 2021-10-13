---
title: xhr
date: 2021-10-12
sidebar: auto
---
ajax 就是异步的js和xml的缩写，目前一般用JSON代替XML</br>
ajax 主要用于在不刷新页面的情况下向浏览器发起请求并接受响应，最后局部更新页面</br>
该技术最核心的概念是XMLHttpRequest对象，该对象可发起HTTP请求，我们可以监听其readystate的变化获得响应</br>

优点：无刷新请求</br>
缺点：被浏览器限制不能跨域</br>
解决跨域 可以使用JSONP或CROS</br>
具体代码:</br>
```javascript
let xhr = new XMLHttpRequest();
xhr.open('get','xxx.xxx.xx/asfaf/asf',true) // 1.请求方式，2.请求的URL，３.同步还是异步，true表示异步
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText)
    }
}
xhr.send(null)
// readyState 
// 0: 对象已建立，但是尚未初始化，还没有调用open方法
// 1: 对象已建立，尚未调用send方法
// 2: send方法已调用，但是当前的状态以及http头未知
// 3: 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误
// 4: 数据接收完毕，此时通过responseBody和responseText获取完整的回应数据
```
## xhr对象的方法：
**abort** ：取消当前的请求
**getAllResponseHeaders**：获取响应的所有HTTP头，每个头名称和值用冒号分割，并以\r\n结束。当send方法完成后后，才可以调用该方法
**getResponseHeader**：从响应信息中获取指定的http头，当send方法成功后才可以调用该方法
**setRequestHeader**：单独指定请求的某个http头，如果已经存在以此名称命名的HTTP头，则覆盖，这方法必须在open方法后调用。