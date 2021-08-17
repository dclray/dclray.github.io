---
title: 跨标签页通信
date: 2021-08-17
sidebar: auto
---
在浏览器中，我们可以同时打开多个Tab页面，每个tab页可以粗略理解为一个“独立”的运行环境，即使是全局对象也不会在多个Tab间共享。然而有些时候，我们希望能在这些“独立”的Tab页面之间同步页面的数据、信息或状态。</br>
**共有七种跨页面通信的方式**
## 同源页面间的跨页面通信（6种）
浏览器的同源策略在下述的一些跨页面通信方法中依然存在限制。
1. **BroadCast Channel**
   BroadCast Channel 可以帮我们创建一个用于广播的通信频道。当所有页面都监听同一频道的消息时，其中某一个页面通过它发送的消息就会被其他所有页面收到。
   ```javascript
    const bc = new BroadcastChannel("Devin") // 名为Devin的频道
   ```
   各个页面可以通过`onmessage`来监听被广播的消息：
   ```javascript
    bc.onmessage = function(e){
        const data = e.data;
        const msg = data.msg;
        const from = data.from;
    }
   ```
   要发送消息时只需要调用实例上的`postMessage`方法即可：
   ```javascript
    bc.postMessage(myData)
   ```
2. **Service Worker**
   Service Worker 是一个可以长期运行在后台的Worker，能够实现与页面的双通信。多页面共享间的Service Worker可以共享，将Service Worker作为消息的处理中心（中央站）即可实现广播效果。
   >Service Worker也是PWA中的核心技术之一
   首先，需要在页面注册Service Worker：
   ```javascript
   // 页面中的逻辑
    navigator.serviceWorker.register("../serviceWorker.js").then(()=>{
        console.log("Service Worker 注册成功")
    })
   ```
   其中`../serviceWorker.js`中对应的Service Worker脚本。Service Worker本身并不自动具备“广播通信”的功能，需要添些代码，将其改造成消息中转站：
   ```javascript
    // ../serviceWorker.js代码
    self.addEventListener('message',(e)=>{
        console.log("service worker receive message",e.data);
        e.waitUnitl(
            self.clients.matchAll().then((clients)=>{
                if(!clients || clients.length === 0){
                    return;
                }
                clients.forEach((client)=>{
                    client.postMessage(e.data)
                })
            })
        ) 
    })
   ```
   在Service Worker中监听了`message`事件，获取页面（从Service Worker的角度叫Client）发送的消息。然后通过`self.clients.matchAll()`获取当前注册了该Service Worker的所有页面，通过调用每个client（即页面）的`postMessage`方法，向页面发送消息。这样就把从一处（某个Tab页面）收到的消息通知给了其他页面。
   
   处理完Service Worker，我们需要在页面监听Service Worker发送来的消息：
   ```javascript
    // 页面逻辑
    navigator.serviceWorker.addEventListener("message",(e)=>{
        const data = e.data;
        const text = data.msg
    })
   ```
   需要同步消息时，可以调用Service Worker的`postMessage`方法：
   ```javascript
    // 页面逻辑
    navigator.serviceWorker.controller.postMessage(myData)
   ```
3. **LocalStorage**
   LocalStorage作为前端最常用的本地存储，基本上都很熟悉了，但是`StorageEvent`相关的事件大家可能就比较陌生了
   当LocalStorage变化时，会触发`storage`事件。利用这个特性，我们可以在发送消息时写入到某个LocalStorage中；然后在各个页面内，通过监听`storage`事件即可收到通知
   ```javascript
    window.addEventListener('storage',(e)=>{
        if(e.key ==="devin_msg"){
            const data = JSON.parse(e.value);
            const msg = data.msg;
            const from = data.form;
        }
    })
   ```