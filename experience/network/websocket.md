---
title: WebSocket
date: 2021-09-25
sidebar: auto
---
## websocket 协议
websocket是web浏览器和服务器之间的一种全双工通信协议，其中webSocket协议由IETF定位标准，webSocket API由W3C定位标准。一旦web客户端和服务器建立起连接，之后的全部数据通信都通过这个连接进行。通信过程中，可相互发送JSON、XML、HTML或图片等任意格式的数据。
websocket 和HTTP协议的共同点：
- 都是基于TCP的应用层协议
- 都使用Request/Response模型进行连接的建立
- 在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码
- 都可以传输数据

不同点在于：
- WS使用HTTP来建立连接，但是定义了一系列新的header
- WS的连接不能通过中间人来转发，它必须是一个直接连接
- WS连接建立后，通信双方都可以在任何时刻向另一方发送数据
- WS连接建立后，数据的传输使用帧来传递，不在需要request消息
- WS的数据帧有序。

 <font color='red'> ❤  websocket是基于TCP的一个应用协议，与HTTP协议的关联之处在于websocket的握手数据被HTTP服务器当作HTTP包来处理，主要通过Update request HTTP包建立起连接，之后的通信全部使用websocket自己的协议。</font>
```shell
GET /uin=xxxxxxxx&app=xxxxxxxxx&token=XXXXXXXXXXXX HTTP/1.1
Host: server.example.cn:443
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36
Upgrade: websocket
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: user_id=XXXXX
Sec-WebSocket-Key: 1/2hTi/+eNURiekpNI4k5Q==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Protocol: binary, base64
```
## nginx 支持websocket 配置
由于http 请求 涉及 反向代理 所以就涉及 nginx 配置需要支持 websocket 需要做一些特殊的配置
``` shell
# 配置Nginx支持webSocket开始
proxy_set_header Host $http_host;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";

```
## 参考链接
[websocket协议详解及报文分析](https://blog.csdn.net/LL845876425/article/details/106393358)