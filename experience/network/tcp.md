---
title: TCP
date: 2021-08-16
sidebar: auto
---
## TCP头格式
- TCP的包是没有IP地址的，那是IP层的上的事。但是有源端口和目标端口。
- 一个TCP连接需要四个元组来表示是同一个连接（src_ip,src_port,dst_ip,dst_port）准确说是五元组，还有一个协议，这里主要说的是TCP协议。
- 四个重要的属性
  - Sequence Number 是包的序号，用来解决网络包乱语（reordering）问题
  - Acknowlegdement Number就是ACK--用于确认收到，用来解决不丢包的问题
  - Window又叫Advertised-Window，也就是著名的滑动窗口（sliding Window），用于解决流控的。
  - TCP Flag，也就是包的类型，主要是用于操控TCP的状态机的。
## TCP的状态机
其实，网络上的传输是没有连接的，包括TCP也是一样的。而TCP所谓的连接，其实只不过是在通讯的双方维护一个连接状态，让他看上去好像有连接一样。所以，TCP的状态变换是非常重要的</br>
下面是：“TCP协议的状态机”和“TCP建立连接”、“TCP断开连接”，“传数据”的对照图。
![An image](/docs/net/tcpfsm.png)
![An image](/docs/net/tcp_open_close.jpg)
- **建立连接的3次握手**，主要是初始化Sequence Number的初始值。通信的双方要互相通知对方通知对方自己的初始化的Sequence Number(缩写 ISN：Inital Sequence Number) --所以叫SYN，全称Synchronize Sequence Numbers 。这个号要作为以后的数据通信的序号，以保证应用层接收到的数据不会因为网络上的传输的问题而乱序（TCP会用这个序号来拼接数据）
- **4次挥手**，其实仔细看是2次，因为TCP是双全工的，所以，发送方和接收方都需要Fin和Ack。只不过，有一方是被动的，所以看上去就成了4次挥手。
- **关于建立连接时SYN超时** 试想，如果server端接到了client发出的SYN后回了SYN-ACK后client掉线了，server端没有收到client回来的ACK，那么，这个连接处于一个中间状态，既没有成功，也没有失败。于是，server端如果在一定时间内没有收到的TCP会重发SYN-ACK。在Linux环境下，默认重试次数为5次，重试的时间间隔从1s开始每次都翻倍，5次重试的时间间隔为1s,2s,4s,8s,16s，总共31s，第5次发出后还要等待32s直到第5次也超时了，所以总共需要1s + 2s + 4s + 8s + 16s +32s = 2^6-1 = 63s，TCP才会把这个连接断开。
- **SYN Flood攻击**一些恶意的人就为此制造了SYN Flood攻击 ---给服务器发了一个SYN后，就下线了，于是服务器需要默认等63s才会断开连接，这样，攻击者就可以把服务器的syn连接的队列耗尽，让正常的连接请求不能处理。于是，Linux下给了一个叫tcp_syncookies的参数来应对这个事--当SYN队列满了后，TCP会通过源地址端口、目标地址端口和时间戳打造出一个特别的Sequence Nunber 发回去（又叫cookie),如果是攻击者则不会有响应，如果是正常连接，则会把这个SYN Cookie发回来，然后服务端可以通过cookie建立连接（即使你不在SYN队列中）。但是，请先千万别用tcp_syncookies来处理正常的大负载的连接的情况。因为syncookies是妥协版的TCP协议，并不严谨。对于正常的请求，你应该调整三个TCP参数可供选择，第一个是：tcp_synack_retries可以用来设置重试的次数；第二个是：tcp_max_syn_backlog,可以增大SYN连接数；第三个是：tcp_abort_on_overflow处理不过来干脆就直接拒绝吧。
- **ISN的初始化**ISN是不能hard code的，不然会出问题 -- 比如：如果连接建立后，始终用1来做ISN，如果client发了30个segment过去，但是网络断了，于是client重连，又用了1来做ISN，但是之前连接的那些包已经呆了，于是就当成了新连接的包，此时，client的Sequence Number可能是3，而server端认为client端的这个号是30了。全乱了。RFC793中说，ISN会和一个假的始终绑在一起，这个时钟回在每4微秒对ISN做加1操作，知道超过2^32，又从0开始。这样一个周期大概4.55小时。因为，我们假设我们的TCP Segment在网络上的存活时间不会超过Maximum Segment Lifetime （缩写为MSL）,所以，只要MSL的值小于4.55小时，那么我们就不会用到重复的ISN
- **MSL和TIME_WAIT**我们注意到，在TCIP的状态途中，从TIME_WAIT状态到CLOSED状态，有一个超时设置，这个超时设置时2*MSL（RFC793定义了MSL为2分钟，Linux设置了30s）为什么要有TIME_WAIT?为什么不直接装成CLOSED状态，主要原因有两个：1.TIME_WAIT确保有足够的时间让对端收到了ACK，如果被动关闭的那方没有收到ACK，就会触发被动端重发Fin，一来一去正好2个MSL，２：有足够的时间让这个连接不会跟后面的连接混在一起（有些自作主张的路由器会缓存IP数据包，如果连接被重用了，那么这些延迟收到的包就有可能会跟新连接混在一起）
- **关于TIME_WAIT数量太多**TIME_WAIT是一个很重要的状态，但是如果在大并发的短链接下，TIME_WAIT就会太多，这也会消耗很多系统资源。大部分处理方式是教你设置两个参数，-个事tcp_tw_reuse,另一个叫tcp_tw_recycle的参数，这两个参数默认值都是被关闭的，后者recycle比前者resue更为激进。如果要使用tcp_tw_reuse必须设置tcp_timestamps = 1 否则无效

## 参考链接

- [TCP的那些事](https://coolshell.cn/articles/11564.html) 