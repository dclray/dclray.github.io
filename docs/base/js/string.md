---
title: 字符串
date: 2021-07-29
sidebar: auto
---

ECMAScript 有 5 种原始类型（primitive type），即 Undefined、Null、Boolean、Number 和 String。

## 注意，string不可以像数组一样赋值，但是可以像数组一样取值
``` javascript 
let str = "123456";
let arr = [1,2,3,4,5,6];
console.log(str[3]) // "4"
console.log(arr[3]) // 4

str[3]= "9"; // 这种操作是无效也是错误的，因为string是原始类型，就是一个值
arr[3] = 9;
```