---
title: 需掌握的方法
date: 2021-07-22
sidebar: auto
---

### 实现trim
```javascript
String.prototype.myTrim = function(){
    return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
```
### 实现deepClone
``` javascript
function deepClone(arg){
    const typeCheck = v => /(?<obj>object) (?<type>[a-zA-Z]+)/.exec(Object.prototype.toString.call(v)).groups.type;
    const typeArg = typeCheck(arg);
    if(typeArg === "Date") return new Date(arg);
    if(typeArg === "RegExp") return new RegExp(arg);
    if(typeArg === "Function") return new Function('return ' + arg.toString()).call(this);
    if(typeArg === "Object"){
        let copyO = {};
        for(let k in arg){
            if(arg.hasOwnProperty(k)){
                copyO[k] = deepClone(arg[k])
            }
        }
        return copyO;
    }
    if(typeArg === "Array"){
        let copyA = [];
        for(let k in arg){
            copyA[k] = deepCopy(arg[k])
        }
        return copyA;
    }
    if(typeArg === "Set"){
        let copyS = new Set();
        for(let v of arg.values()){
            copyS.add(deepCopy(v))
        }
        return copyS
    }
    if(typeArg === "Map"){
        let copyM = new Map();
        arg.forEach((v,k)=>{
            copyM.set(k,deepCopy(v))
        })
        return copyM;
    }
    return arg; // number, string, boolean, null, undefined

}
```

### 实现柯里化
``` javascript
function curry(fn,...args){
    let allArg = args;
    let fun = function (){
        allArg.concat(arguments)
        return fun;
    }
    fun.prototype.toString = function(){
        allArg.reduce(fn)
    }
    return fun;
}
```

### 大数相加
``` javascript
let aa = "9007199254740991";
let bb = "1234567899999999999";
function add (a,b){
    let maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let sum = "", carry = 0;
    for(let i = maxLength -1; i >= 0; i--){
        let val = parseInt(a[i]) + parseInt(b[i]) + carry;
        sum =  val % 10 + sum
        carry = Math.floor(val / 10);
    }
    if(carry > 0){
        sum = carry + sum
    }
    return sum;
}
```

### 拍平数组
``` javascript 
function flatArray(arr){
    while(arr.finde(item=>Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr;
}
```

### 防抖实现
触发完事件 n 秒内不再触发事件，才执行
立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
``` javascript 
function debounce(func, wait, immediate) {
	let timer = null;
	const debounced = (...args) => {
		if (timer) clearTimeout(timer);
		if (immediate) {
            let callNow = !timer;
            timer = setTimeout(()=>{
                timer = null;
            },wait)
		    callNow && func.apply(this, args)
		}
        if(!immediate){
            timer = setTimeout(function(){
                func.apply(this, args)
            }, wait);
        }
        
	};
	debounced.cancel = function() {
		clearTimeout(timer);
	};
	return debounced;
}
```


### 节流实现
如果你持续触发事件，每隔一段时间，只执行一次事件

``` javascript 
function throttle(func, wait, {leading = true, trailing = false} = {} ) {
    let timer =null, previous = 0;
    const throttled = (...args)=> {
        let now = new Date().getTime();
        // leading（引领，带路） 开头执行 
        if (leading && now - previous >= wait) {
            previous = now;
            func.apply(this, args);
        }
        // trailing（尾随） 结尾执行 
        if (trailing && !timer) {
            timer = setTimeout(()=> {
                timer = null;
                func.apply(this, args);
            }, wait);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timer);
        previous = 0;
        timer = null;
    };

    return throttled;
}
```

### 数组翻转
``` javascript
// 使用了双指针的思路
function reverse(s){
    let l = -1,r=s.length;
    while(++l < --r){
        let v = s[l];
        s[l] = s[r];
        s[r] = v;
    }
    return s;
}
```

### 数字千位分隔符
``` javascript
function numFormat(num){
    return num.toString().replace(/\d+/,function(n){
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
            return $1 + ','
        })
    })
}
```

### 判断回文字符串
``` javascript
isPalindrome = function(x) {
    s = x.toString().split("");
    let l = -1,r=s.length;
   while(++l<--r){
       let v = s[l];
       s[l] = s[r]
       s[r] = v ;
   }
    s = s.join("")
   return x.toString() === s
};
```

### 判断一个数是不是素数

首先看一个关于素数（质数）分布的规律：大于等于5的质数一定和6的倍数相邻。例如5和7，11和13，17和19等等; <br>
证明： 令 x >= 1，将大于等于5的自然数表示如下：<br/>
......6x-1,6x,6x+1,6x+2,6x+3,6x+4,6x+5,6(x+1),6(x+1)+1......可以看到，不在6的倍数两侧，即6x两侧的数为6x+2,6x+3,6x+4,由于2(3x+1),3(2x+1),2(3x+2),所以它们一定不是素数，再除以6x本身，显然，素数要出现只可能出现在6x的相邻两侧。这里要注意的一点是，在6的倍数相邻两侧并不是一定就是质数。 <br>
此时，判断质数可以6个为单元快进，即将循环中i++步长加大为6，加快判断速度，原因是，假如要判定的数为n，则n必定是6x-1或6x+1的形式，对于循环中6i-1,6i,6i+1,6i+2,6i+3,6i+4,其中如果n能被6i，6i+2,6i+4整除，则n至少能被3整除，但是6x能被3整除，故6x-1或6x+1(即n)不可能被3整除，故不成立。综上，循环中只需要考虑6i-1和6i+1的情况，即循环的步长可以定为6，每次判断循环变量k和k+2的情况即可，理论上讲整体的速度是极快的。
``` javascript
function isPrime(num){
    if(num === 2 || num === 3) return true
    if(num % 6 !== 1 && num % 6 !== 5) return false
    let m = sqrt(num); // 求取平方根
    for(let i = 5 ;i <= m; i += 6){
        if(num % i == 0 || num % (i + 2) === 0){
            return false
        }
    }
    return true;
}
```

### 16进制转为rgb
```javascript
function fromHex (color){
    let t ={}, bits = color.length === 4 ? 4 : 8, mask = (1 << bits) - 1;
    color = Number(`0x${color.substr(1)}`);
    if(isNaN(color)){return null}
    ["b","g","r"].forEach(function(x){
        let c = color & mask;
        t[x] = bits === 4 ? 17 * c : c;
        color = color >> bits;
    })
    t.a = 1;
    return t;
}
```
### compose 
```javascript 
    function fn1 (x){ return x + 1 }
    function fn2 (x){ return x + 2 }
    function fn3 (x){ return x + 3 }
    function fn4 (x){ return x + 4 }
    const a = compose(fn1,fn2,fn3,fn4)
    console.log(a(1)) // 1+4+3+2+1 = 11;

    function compose(...fns){
        if(fns.length ===0){return (v)=>v}
        if(fns.length ===1){return fns[0]}
        return fns.reduce((pre,cur)=>{
            return (...args)=>{
                return pre(cur(...args))
            }
        }})
    }
```
### 实现lazyMan
```javascript
    // 实现一个LazyMan 可以按照一下方式调用
    LazyMan("Hank")
    // Hi ! This is Hank
    LazyMan('Hank').sleep(10).eat("dinner")
    // Hi ,This is Hank  
    // 等待10s
    // wake up after 10
    // Eat dinner
    LazyMan("Hank").eat("dinner").eat("supper")
    // Hi This is Hank
    // eat dinner
    // eat supper
    LazyMan("Hank").eat("supper").sleepFirst(5)
    // 等待5s 
    // wake up after 5s
    // Hi this is Hank
    // eat supper
```
```javascript
// 借鉴generate 方式使用next调用
    class _lazyMan {
        constructor(name){
            this.tasks = [];
            const task = ()=>{
                console.log(`Hello, This is ${name}`)
                this.next()
            }
            this.tasks.push(task)
            setTimeout(()=>{
                this.next()
            },0)
        }
        next(){
            const task = this.tasks.shift()
            task && task()
        }
        sleep(time){
            this._sleepWrapper(time,false)
            return this
        }
        sleepFirst(time){
            this._sleepWrapper(time,true)
            return this
        }
        _sleepWrapper(time,first){
            const task = ()=>{
                setTimeout(()=>{
                    console.log(`sleep ${time}`)
                    this.next()
                },time)
            }
            if(first){
                this.tasks.unshift(task)
            }else{
                this.tasks.push(task)
            }
        }
        eat(name){
            const task = ()=>{
                console.log(`eat ${name}`)
                this.next()
            }
            this.tasks.push(task);
            return this;
        }
    }
    function LazyMan(name){
        return new _lazyMan(name)
    }
    // 使用promise 
  function createPerson(){
    let toList = []
    setTimeout(async ()=>{
        for (let todo of toList){
            await todo()
        }
    },0)

    return {
        eat(something){
            toList.push(function(){
                console.log(`Eat ${something}~`)
            })
            return this
        },
        sleep(time){
            let promise =function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve(console.log(`Wake up after ${time}`))
                    },time)
                })
            }
            toList.push(promise)
            return this
        },
        sleepFirst(time){
            let promise =function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve(console.log(`Wake up after ${time}`))
                    },time)
                })
            }
            toList.shift(promise)
            return this
        }
    }
}



createPerson('Devin').sleep(10000).eat('dinner').eat('supper')

```

### 版本号排序
一组版本号`['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']`，现在需要对其排序
```javascript
    const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];
    // while 循环
    arr.sort((a,b)=>{
        let i = 0;
        const arr1 = a.split('.'),arr2 = b.split('.');
        while(true){
            const s1 = arr1[i],s2 = arr2[i];
            i++;
            if(s1 === undefined || s2 === undefined){
                return arr2.length - arr1.length;
            }
            if(s1 === s2) continue;
            return s2 - s1;
        }
    })
    // for 循环
    arr.sort((a,b)=>{
        const arr1 = a.split("."),arr2 = b.split(".");
        let maxlength = Math.max(arr1.length,arr2.length);
        for(let i =0;i< maxlength; i++){
            const s1 = arr1[i],s2= arr2[i];
            if(s1 === undefined || s2 === undefined){
                return arr2.length - arr1.length
            }
            if(s1 !== s2) {
                return  s2- s1;
            }
        }
    })
```

### LRU 算法
设计和实现一个LRU缓存机制，它应该支持以下操作：获取数据`get`和写入数据`put`</br>
获取数据`get(key)` 如果密钥（key）存在于缓存中，则获取密钥的值（总是正数），否则返回-1</br>
写入数据`put(key,value)` 如果密钥已经存在，则变更其数据；如果密钥不存在，则插入该组值。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间
```javascript
    class LRUCache(){
        constructor(capacity){
            this.secretKey = new Map();
            this.capacity = capacity;
        }
        get(key){
            if(this.secretKey.has(key)){
                let tempValue = this.secretKey.get(key)
                this.secretKey.delete(key);
                this.secretKey.set(key,tempValue)
                return tempValue
            }else{
                return -1;
            }
        }
        put(key,value){
            if(this.secretKey.has(key)){
                this.secretkey.delete(key)
                this.secretKey.set(key,value)
            }else if(this.secretKey.size < this.capacity>){
                this.secretKey.set(key,value)
            }else{
                this.secretkey.set(key,value);
                this.secretkey.delete(this.secretKey.keys().next().value)
            }
        }
    }
// let cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4
```

