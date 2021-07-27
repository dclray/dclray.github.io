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
