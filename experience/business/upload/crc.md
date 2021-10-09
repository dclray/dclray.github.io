---
title: 大文件生成crc32
date: 2021-07-22
sidebar: auto
---


### 代码实现
```javascript
import('../crc32.js');

input.addEventListener("change",function(e){
    console.log(e.target.files[0])
    getCrc32(e.target.files[0]).then(res=>{
        console.log(res,"valuecrcNumber")
        console.log(toHex(res))
    })
})

function toHex(val){
    val = (val >>>0).toString(16);
    if(val.length>8){return val}
    return val.padStart( 8, "0")
}

function getCrc32(file){
    return new Promise((resolve,reject)=>{
        try{
           (function loadNext ({ seed, start }){
                const fileReader = new FileReader();
                let chunk = 0x100000;
                if(start + chunk > file.size) {
                    chunk = file.size - start
                }
                const fileChunk = file.slice(start,start+chunk);
                fileReader.onload = function (e){
                    let biteArr = new Uint8Array(e.target.result);
                    let newcrc = CRC32.buf( biteArr, seed);
                    if(start + chunk >= file.size){
                        resolve(newcrc)
                    }else{
                        loadNext({seed:newcrc,start:start+chunk})
                    }
                }
                fileReader.readAsArrayBuffer(fileChunk);
            })({seed:0,start:0})
           
        }catch(e){
            reject(e)
        }
    })
   
}
```

## 上传优化点
1. 分片计算crc32
2. webworker </br>   
   允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
