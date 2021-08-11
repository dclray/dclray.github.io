---
title: 变量声明提升和函数声明提升
date: 2021-08-05
sidebar: auto
---
## 变量定义
可以使用var定义变量，变量如果没有赋值，那变量的初始值为`undefined`。
## 变量作用域
变量作用域指变量起作用的范围。变量分为全局变量和局部变量。全局变量在全局都拥有定义；而局部变量只能在函数内有效。在函数体内，同名的局部变量或者参数的优先级会高于全局变量。也就是说，如果函数内存在和全局变量同名的局部变量或者参数，那么全局变量将会被局部变量覆盖。</br>
所以不使用`var`定义的变量都视为全局变量
## 函数作用域和声明提前
JavaScript的函数作用域是指在函数内声明的变量在函数体内始终是有定义的，也就是说变量在声明之前已经可用，所有这种特性被称为**声明提前（hoisting）**，即JavaScript函数里的所有声明（只是声明，但不涉及赋值）都被提前到函数体的顶部，而变量赋值操作留在原来的位置。</br>
::: tip
声明提前是在JavaScript引擎的预编译时进行的，是在代码开始运行之前。
:::
变量声明提前之前
```javascript
var a = "hello";
function fun(){
    console.log(a); // undefined
    var a = "Devin";
    console.log(a); // Devin
}
```
变量声明提前后
```javascript
var a = "hello";
function fun(){
    var a;
    console.log(a);
    a = "Devin";
    console.log(a);
}
```
经过这样的变形后，答案就非常明显了。由于`a`变量在第一个`console.log()`语句之前就已经定义了，但是并没有赋值，因此此时`a`的值是`undefined`。第二个`console.log()`语句之前，`a`已经完成赋值`"Devin"`，所以输出是`"Devin"`;
## 函数声明提前
函数有两种创建方式：**1.函数声明** **2.函数表达式**</br>
函数声明语法：
``` javascript
gun(); // 打印出 "hello"
function gun(){
    console.log("hello")
}
```
函数表达式语法：
```javascript 
gun(); // 报错，Uncaught ReferenceError: gun is not defined
var gun = function (){
    console.log("hello")
}
```
为什么函数声明语法和函数表达式语法存在着差异？这是因为，函数声明有一个非常重要的特征：函数声明提升，函数声明语句将会提升到外部脚本或者外部函数作用域的顶部（跟变量提升类似）。正是因为这个特征，所以可以把函数声明放在调用它的语句后面。
```javascript 
function fun (){
    console.log(1);
}
var fun = function(){
    console.log(2);
}
fun()
```
分析代码，这段代码中涉及到了<font color='red'>变量声明提升</font>和<font color='red'>函数声明提升</font>。函数声明`function fun (){}`的声明会被提前到顶部。而函数表达式`var fun = function(){}`则表现为变量声明提升。因此，在这种情况下，`fun`也是一个变量，因此这个变量的声明也将提升到顶部，而变量的赋值依然保留在原地。需要注意的是，函数优先，虽然函数声明和变量声明都会被提升，但是函数会首先被提升，然后才是变量。因此：
```javascript
function fun(){ console.log(1); }// 函数声明提升到顶部
var fun ; // 变量声明提升到顶部
fun = function(){ console.log(2); } // 变量赋值待在原地
fun()// 最终输出 2
```
::: tip
`let`和`const`声明的变量不会出现变量提升
:::