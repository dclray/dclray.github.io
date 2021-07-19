---
title: 需要手写实现的方法
date: 2021-07-16
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
``` javascript 
function debounce(func, wait, immediate) {
	let timer, result;
	const debounced = (...args) => {
		if (timer) clearTimeout(timer);
		if (immediate && !timer) {
			result = func.apply(this, args)
            return result;  
		}
        timer = setTimeout(function(){
				func.apply(this, args)
		}, wait);
	};

	debounced.prototype.cancel = function() {
		clearTimeout(timer);
		timer = null;
	};

	return debounced;
}
```


### 节流实现
如果你持续触发事件，每隔一段时间，只执行一次事件

``` javascript 
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}
```