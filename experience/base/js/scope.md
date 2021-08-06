---
title: 作用域
date: 2021-08-05
sidebar: auto
---
## 作用域
作用域是指程序源码中定义变量的区域</br>
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限</br>
JavaScript采用词法作用域（lexical scoping），也就是静态作用域
## 静态作用域和动态作用域
JavaScript采用的是词法作用域，函数的作用域在函数定义的时候就决定了。</br>
于词法作用域相对的是动态作用域，函数的作用域在函数调用的时候才决定的。</br>
```javascript
var a = 1;
function foo (){
    console.log(a)
}

function bar (){
    var a = 2;
    foo()
}
bar()
```
因为JavaScript采用的是词法作用域，所以函数的作用域在定义的时候已经决定了，`foo`函数中没有`a`变量，因此向上查找变量，全局中有`a`变量，所以，调用`bar`时，输出 1
## 动态作用域
`bash`语言就是动态作用域，把下面的脚本存成`hello.bash`，然后进入相应的目录，用命令执行`bash ./hello.bash`
```javascript
value = 1;
function foo (){
    echo $value;
}
function bar(){
    local value = 2;
    foo;
}
bar 
```
## 看一下《JavaScript权威指南》中的例子
```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope() // "local scope"
```

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope
    }
    return f
}
checkscope()() // "local scope"
```
因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。

## 作用域和执行上下文
JavaScript属于解释型语言，JavaScript的执行分为：**1.解释阶段** **2.执行阶段** </br>
解释阶段：**1.词法分析** **2.语法分析** **3.作用域规则确定** </br>
执行阶段：**1.创建执行上下文** **2.执行函数代码** **3.垃圾回收** </br>
JavaScript解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是this的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。</br>
作用域和执行上下文之间最大的区别是：执行上下文在运行时确定，随时可能改变；作用域在定义时（词法作用域）就确定，并且不会改变。
一个作用域下可能包含若干个上下文环境，有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。

## 作用域和原型的区别
**作用域：** 决定变量的生命周期及其可见性，作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。所以，作用域中变量的值是在执行过程中产生确定的，而作用域却是在函数创建时就确定了。</br>
所以，如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。</br>
作用域链是一个父作用域（该函数使用了父上下文的属性）的集合</br>
使用没有定义的值报错`referenceError` </br>
**原型：** 
原型链是一个链表</br>
使用没有定义的值输出`undefined`
