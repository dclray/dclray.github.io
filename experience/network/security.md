---
title: 网络安全
date: 2021-09-25
sidebar: auto
---
## cookie和token，为什么不会劫持token CSRF
1. 浏览器会自动带上cookie，但是不会自动带上token
2. cookie其实是服务器产生的sessionid
3. token需要开发者手动塞进请求头中
4. 跨站请求伪造：CSRF(Cross-site request forgery)

跨站伪造：
1. 用户登录信任网站A，并产生cookie
2. 用户在没有登出A的情况下，访问危险网站B
3. B要求访问站点A，发出一个请求，请求带着cookie访问A
4. A的服务器不知道请求时A发出的还是B发出的，由于浏览器会自动带上用户的Cookie

解决办法：
1. 服务端产生一个token，发送给客户端，有客户端开发者主动塞入header中而不是浏览器自动带上，服务端拿到token参数校验，不合法的token请求被拒绝
2. 通过header中referer:
   1. 举例：百度一张图 www.baidu.com/path/picture.jpg
   2. 在我自己的网站www.custom.com/path/home.html中，引用了这个图片的url。
   3. 百度服务器在收到图片请求头中根据Referer，能知道是张三的网页，还是李四的网页在请求
   4. 可以用来做引流统计。还可以用来做防盗链。如果请求是来自李四的，就拒绝。

## XSS 跨域脚本攻击（cross site scripting）
跨域脚本攻击:
1. 不需要任何的登录认证
2. 它会通过合法的操作（比如在url中输入、在评论框中输入），向你的页面注入脚本。
比如搜索输入框中。输入`<script>alert(1)</script>`。

如何防范呢：
1. URL的编码处理。比如字符“var a = 5”,编码后就是纯文本，不编码就会被浏览器解析成一个变量赋值
2. 移除用户输入的Style节点、Script节点、Iframe节点等过滤。（白名单）