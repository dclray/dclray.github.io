---
title: HTTP
date: 2021-09-25
sidebar: auto
---
HTTP(Hypertext transfer protocol) 超文本传输协议
## HTTP 0.9/1.0
HTTP0.9版本的协议简单到极点，请求时，不支持请求头，只支持GET方法，没了，HTTP1.0扩展了0.9版，其中主要增加了：
- 在请求中加入了HTTP版本号， HTTP/1.0
- 开始有header了，不管是request还是response都有header
- 增加了HTTP Status Code 标识相关的状态码
- 增加Content-type 可以传输其他的文件
问题：
- 每请求一个资源都要新建一个TCP链接，而且是串行请求
## HTTP/1.1
- 可以设置keepalive 来让HTTP重用TCP链接，重用TCP链接节省了每次请求都要在广域网上进行的TCP三次握手巨大的开销这就是HTTP长链接
- 支持pipeline网络传输，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间
- 支持Chunked Responses在response 的时候，不必说明Content-Length，客户端就不能断连接，知道收到服务端的EOF标识。这种又叫服务端Push模型，或是服务端push式的HTTP持久链接
- 增加了cache　control机制
- 协议头增加了Language，encoding，type等header，让客户端可以跟服务器端进行更多的协商
- 增加了Host　Header，这样服务器就知道请求那个网站了。因为可以有多个域名解析到同一个IP上，要区分用户是请求的哪个域名，就需要在HTTP协议中加入域名的信息，而不是被DNS转换过的IP信息。
- 增加了OPTIONS 方法，主要用于CORS-Cross Origin Resource Sharing应用
- 在HTTP/1.1下，HTTP已经支持四种网络协议：
  - 传统的短链接
  - 可重用的TCP的长链接模型
  - 服务端Push的模型
  - WebSocket模型
## HTTP/2
HTTP/2和HTTP/1.1最主要的不同是：
- 是一个二进制协议，增加了数据传输的效率，而HTTP/1.1传输数据时，是以文本的方式
- 是可以在一个TCP链接中并发请求多个HTTP请求，移除了HTTP／1.1的串行请求
- 会压缩头部，如果同时发出多个请求，并且头部是一样的或相似的，那么协议会消除重复的部分
- 允许服务端在客户端放cache，也叫做服务端push，比如，请求A，服务端知道A依赖B，虽然没有请求B，但是服务端会将B跟着A的请求返回客户端
## HTTP/3
HTTP/2的主要问题：
- 若干个HTTP请求在复用一个TCP连接，底层的TCP协议是不知道上层有多少个HTTP请求的，所以一旦发生丢包，造成的问题是，所有的HTTP请求都必须等待这个丢了的包被重传回来这个问题又叫Head-of-line blocking问题。HTTP/1.1中的pipeline中如果有一个请求block了，那么队列后请求也统统被block住了；HTTP/2 多请求复用一个TCP连接，一旦发生丢包，就会block住所有的HTTP请求。
HTTP/3将HTTP底层的TCP协议改成了UDP
## 参考链接
[HTTP的前世今生](https://coolshell.cn/articles/19840.html#HTTP_09_10)