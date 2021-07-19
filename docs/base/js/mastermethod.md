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
