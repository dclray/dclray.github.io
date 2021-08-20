---
title: Worker种类
date: 2021-08-18
sidebar: auto
---
**Web Worker**，**Service Worker**，**Shared Worker**，**Audio Worder**
## 突破单线程的瓶颈Web Worker
web worker就是一个后台执行JS文件的方法，能够给前端传递信息，前端也可以传递信息给webWorker
- web worker 是一个全新的上下文，与创建它的线程无关
- 不可以执行dom操作
- 没有window这个对象
- 通过postMessage传递消息

## 共享的 share worker
共享worker，页面之间需要符合同源策略</br>
Shared Worker 是 Worker 家族的另一个成员。普通的 Worker 之间是独立运行、数据互不相通；而多个 Tab 注册的 Shared Worker 则可以实现数据共享。

## service worker
:::tip
Service worker是一个注册在指定源和路径下的事件驱动worker。
它采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。
常见于网络不可用的情况下 常用于PWA开发
:::
Service Worker 是一个可以长期运行在后台的 Worker，能够实现与页面的双向通信。多页面共享间的 Service Worker 可以共享，将 Service Worker 作为消息的处理中心（中央站）即可实现广播效果。