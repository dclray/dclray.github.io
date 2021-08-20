---
title: 两种路由模式
date: 2021-08-19
sidebar: auto
---
## 为什么要使用路由
现在网络应用程序越来越多的使用AJAX异步请求完成页面的无缝刷新，导致浏览器的URL不会发生生任何变化而完成了请求，从而提高了用户浏览的体验。同时本次浏览的页面内容在用户下次使用URL访问时将无法重新呈现，使用路由就可以很好的解决这个问题。</br>
单页面应用利用了JavaScript动态变化网页内容，避免了页面重载；路由提供了浏览器地址变化，网页内容也跟随变化，两者结合起来则为我们提供了体验良好的单页面web应用。
## 前端路由实现方式
路由需要实现三个功能：
1. 当浏览器地址变化时，切换页面；
2. 点击浏览器【后退】、【前进】按钮，网页内容跟随变化；
3. 刷新浏览器，网页加载当前路由对应内容

在单页面web网页中，单纯的浏览器地址改变，网页不会重载，如单纯的hash网址改变网页不会变化，因此我们的路由主要时通过监听事件，并利用js实现动态改变网页内容，有两种实现方式：
- hash模式：监听浏览器地址hash值变化，执行相应的js切换网页
- history模式：利用history API实现URL地址改变，网页内容改变

它们的区别最明显的就是hash回在浏览器地址后面增加#号，而history可以自定义地址
## hash模式
使用`window.location.hash`属性及窗口的`onhashchage`事件，可以实现监听浏览器地址hash值变化，执行相应的js切换网页。下面具体介绍介个使用过程中必须理解的要点：
1. hash指的是地址中#号以及后面的字符，也称为散列值。hash也称作锚点，本身是用来做页面跳转定位的。如http://localhost/index.html#abc，这里的#abc就是hash;
2. 散列值是不会随请求发送到服务器端的，所以改变hash，不会重新加载页面
3. 监听window的hashchange事件，当散列值改变时，可以通过location.hash来获取和设置的hash值
4. location.hash值的改变会直接反应到浏览器地址栏

## 触发hashchange事件的几种情况：
- 浏览器地址栏散列值的变化（包括浏览器的前进、后退）会触发window.location.hash值的变化，从而触发onhashchange事件；
- 当浏览器地址栏中URL包含哈希如`http://www.baidu.com/#home`，这是按下输入，浏览器发送`http://www.baidu.com/`请求至服务器，请求完毕之后设置散列值为#home，进而触发`onhashchange`事件；
- 当只改变浏览器地址栏URL的哈希部分，这时按下回车，浏览器不会发送任何请求至服务器，这时发生的只是散列值新修改的哈希值，并触发`onhashchange`事件
- html中a标签的属性href可以设置为页面的元素ID如#top，当点击该链接时页面跳转至该id元素所在区域，同时浏览器自动设置`window.location.hash`属性，地址栏中的哈希值也会改变，并触发`onhashchange`事件
```javascript
    // 设置url的hash，回在当前url后加上#abc
    window.location.hash = 'abc';
    let hash  = window.location.hash; // '#abc'
    window.addEventListener('hashchange',(e)=>{
        // 监听hash变化，点击浏览器的前进后退会触发
    })
```
## history模式
- `window.history`属性指向History对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路径，不会刷新页面
- History对象保存了当前窗口访问过所有页面网址。通过`history.length`可以得出当前窗口一共访问过几个网址
- 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航
- 浏览器工具栏的“前进”和“后退”按钮，其实就是对History对象进行操作

History对象主要有两个属性
- `window.history.length`：当前窗口访问过的网址数量（包括当前网页）
- `window.history.state`：History堆栈最上层的状态值

History对象的方法：
- `window.history.back()`：移动到上一个网址，等同于点击浏览器的回退按钮。对于第一个访问的网址，该方法无效
- `window.history.forward()`：移动到下一个网址，等同于点击浏览器的前进按钮。对于最后一个访问的网址，该方法无效
- `window.history.go()`：接受一个整数位参数，以当前网址为基准，移动到参数指定的网址。如果参数超过实际存在的网址范围，该方法无效；如果不指定参数，默认参数为0，相当于刷新页面。
- `window.history.pushState()`：该方法用于在历史中添加一条记录。`pushState()`方法不会触发页面刷新，只是导致History对象发生变化，地址栏不会有变化。
- `window.history.replaceState()`：该方法用来修改History对象当前的记录，用法与`pushState()`方法一样。
:::tip
移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页
:::
History对象发生变化时触发的事件：popstate
## window.history.pushState()
语法：`window.history.pushState(object,title,url)`</br>
该方法接受三个参数，依次为：
- object：是一个对象，通过`pushState`方法可以将该对象内容传递到新页面中。如果不需要这个对象，此处可以填null。
- title：指标题，几乎没有浏览器支持该参数，传一个空字符串比较安全
- url：新的网址，**必须与当前页面处在同一个域**。不指定的话则为当前的路径，如果设置了一个跨域网址，则会报错。

:::tip
如果pushState的URL参数设置了一个新的锚点值（即hash），并不会触发`hasnchange`事件。反过来，如果URL的锚点值变了，则会在History对象创建一条浏览记录。
pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在同一个网站上，因为这个方法不会导致页面跳转
:::
## window.history.replaceState()
假定当前网页是`example.com/example.html`
```javascript
    window.history.pushState(null,'','?page=1');
    // url显示为http://example.com/example.html?page=1
    window.history.pushState(null,'',"?page=2")
    // url显示为http://example.com/example.html?page=2
    window.history.replaceState(null,'','?page=3')
    // url显示为http://example.com/example.html?page=3
```
## popstate事件
每当history对象发生变化时，就会触发`popstate`事件
- 仅仅调用`pushState()`方法或`replaceState()`方法，并不会触发该事件
- 只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用`history.back()`、`history.forward()`、`history.go()`方法时才会触发。
- 另外，该事件只针对同一个同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
- 页面第一次加载的时候，浏览器不会触发`popstate`事件

使用的时候，可以为`popstate`事件指定回调函数
```javascript 
window.addEventListener('popstate',(e)=>{
    // e.state 相当于 history.state
    console.log('state' + JSON.stringfy(e.state))
    console.log(history.state)
})
```
缺点：当改变页面地址后，强制刷新浏览器时，（如果后端没有做准备的话）会报错，因为刷新时那当前地址去请求服务器的，如果服务器中没有相应的页面，会出现404页面

## 总结
- hash模式主要是通过监听hashchange事件获得hash值的改变，从而改变网页的内容
- history模式主要是通过监听popstate事件获得history对象的改变，从而改变网页的内容