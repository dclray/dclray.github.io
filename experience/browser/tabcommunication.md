---
title: 跨标签页通信
date: 2021-08-17
sidebar: auto
---
在浏览器中，我们可以同时打开多个Tab页面，每个tab页可以粗略理解为一个“独立”的运行环境，即使是全局对象也不会在多个Tab间共享。然而有些时候，我们希望能在这些“独立”的Tab页面之间同步页面的数据、信息或状态。</br>
**共有七种跨页面通信的方式**
## 同源页面间的跨页面通信（6种）
浏览器的同源策略在下述的一些跨页面通信方法中依然存在限制。
## 1. **BroadCast Channel**
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
## 2. **Service Worker**
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
## 3. **LocalStorage**
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
在各个页面添加如上的代码,即可监听到LocalStorage的变化。当某个页面需要发送消息时，只需要使用我们熟悉的`setItem`方法即可：
```javascript
window.localStorage.setItem("devin_msg",JSON.stringify("hello"))
```
:::tip
storage事件只有在值真正改变时才会触发，所以可以为我们的值添加一个取当前毫秒时间戳的属性
:::
以上三种都是使用的广播模式，一个页面将消息通知给一个”中央站“，再由中央站将通知给各个页面。
## 4. **Shared Worker**
Share Worker是Worker家族的另一个成员。普通的worker之间是独立运行、数据互不相通；而多个Tab注册的Shared Worker则可以实现数据共享。</br>
Share Worker在实现跨页面通信时的问题在于，它无法主动通知所有页面，因此，我们会使用轮询的方式，来拉取最新的数据。</br>
首先，我们会在页面中启动一个Shared Worker，启动方式非常简单：
```javascript
    // 构造函数的第二个参数是Shared Worder名称，也可以为空
    const sharedWorker = new SharedWorker('../shareworker.js',"devin_share")
```
然后，在该Shared Worker中支持get与post形式的消息：
```javascript
    // ../shareworker.js  
    let data = null;
    self.addEventListener('connect',(e)=>{
        const port = e.ports[0];
        port.addEventListener('message',(event)=>{
            // get指令则返回存储的消息数据
            if(event.data.get){
                data && port.postMessage(data)
            }else{
                // 非get指令则存储该消息数据
                data = event.data
            }
           
        })
        port.start()
    })
```
之后，页面定时发送get指令的消息给Shared Worker，轮询最新的消息数据，并在页面监听返回信息：
```javascript 
    // 定时轮询，发送get指令的消息
    setInterval(function(){
        sharedWorker.port.postMessage({get:true})
    },1000)
    // 监听get消息的返回数据
    sharedWorker.port.addEventListener("message",(e)=>{
        const data = e.data;
        const text = data.msg
        const from = data.from

    },false);
    sharedWorker.port.start();
```
最后，当要跨页面通信时，只需给Shared Worder `postMessage`即可：
```javascript
    sharedWorker.port.postMessage(data)
```
:::tip
注意，如果使用`addEventListener`来添加Shared Worker的消息监听，需要显示调用`MessagePort.start`方法，即上文中的`sharedWorker.port.start()`；如果使用`onmessage`绑定监听则不需要
:::
## 5. IndexedDB
除了可以利用Shared Worker 来共享存储数据，还可以使用其他一些”全局性“（支持跨页面）的存储方案。例如IndexedDB或cookie。</br>
其思路很简单：与Shared Worder方案类似，消息发送方将消息存至IndexedDB中；接收方则通过轮询取获取最新的消息。
- 打开数据库连接：
  ```javascript
    function openStore(){
        const storeName = "devin_store";
        return new Promise((resolve,reject)=>{
            if(!('indexedDB' in window)){
                return reject('don\'t support indexedDB')
            }
            const request  = indexedDB.open("CTC_DB",1);
            request.onerror = reject;
            request.onsuccess = e=>resolve(e.target.result);
            request.onupgradeneeded = function(e){
                const db = e.srcElement.result;
                if(e.oldVersion ===0 && !db.objectStoreNames.contains(storeName)){
                    const store = db.createObjectStore(storeName,{keyPath:'tag'});
                    store.createIndex(storeName + 'Index','tag',{unique:false})
                }
            }
        })
    }
  ```
## 6. window.open + window.opener
当我们使用`window.open`打开页面时，方法会返回一个被打开页面`window`的引用。而在未显示指定`noopener`时，被打开的页面可以通过`window.opener`获取到打开它的页面的引用---通过这种方式我们就将这些页面建立起了联系（一种树形结构）。</br>
首先，我们把`window.open`打开的页面的`window`对象收集起来：

## 非同源页面之间的通信 iframe

## 总结
对于同源页面，常见的方式包括：
- 广播模式：Broadcast Channe/ Service Worker / LocalStorage + StorageEvent
- 共享存储模式：Shared Worker/ IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：websocket / comet / sse等

而对于非同源页面，则可以通过嵌入同源iframe作为桥，将非同源页面通信转换为同源页面通信
