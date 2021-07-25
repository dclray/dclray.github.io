---
sidebar: auto
---

# 需手动实现的方法

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
function throttle(func, wait, {leading = true, trailing = false} ) {
    let timer =null, previous = 0;
    const throttled = (...args)=> {
        let now = new Date().getTime();
        // leading（引领，带路） 开头执行 
        if (leading && now - previous >= wait) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
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