---
title: JavaScript知识
date: 2021-07-13
sidebar: auto
---
JavaScript 是 Web 的编程语言。所有现代的 HTML 页面都使用 JavaScript。JavaScript 非常容易学。
::: tip 
本文档主要是梳理JavaScript中常用的概念 ,jacascript BOM DOM Ecmascript
:::
本栏的主要内容如下：

## js 
JavaScript 是解释型语言，一般通过 词法分析 -> 语法分析 -> 语法树，就可以开始执行了</br>
JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程范式。</br>

JavaScript属于解释型语言，JavaScript的执行分为：**1.解释阶段** **2.执行阶段** </br>
解释阶段：**1.词法分析** **2.语法分析** **3.作用域规则确定** </br>
执行阶段：**1.创建执行上下文** **2.执行函数代码** **3.垃圾回收** </br>
JavaScript解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是this的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。</br>
作用域和执行上下文之间最大的区别是：执行上下文在运行时确定，随时可能改变；作用域在定义时（词法作用域）就确定，并且不会改变。
一个作用域下可能包含若干个上下文环境，有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。
- 是一种解释性脚本语言（代码不进行预编译）。
- 主要用来向HTML（标准通用标记语言下的一个应用）页面添加交互行为。
- 可以直接嵌入HTML页面，但写成单独的js文件有利于结构和行为的分离。
- 跨平台特性，在绝大多数浏览器的支持下，可以在多种平台下运行（如Windows、Linux、Mac、Android、iOS等）。
- JavaScript脚本语言同其他语言一样，有它自身的基本数据类型，表达式和算术运算符及程序的基本程序框架。JavaScript提供了四种基本的数据类型和两种特- 殊数据类型用来处理数据和文字。而变量提供存放信息的地方，表达式则可以完成较复杂的信息处理。
- 动态性。JavaScript是一种采用事件驱动的脚本语言，它不需要经过Web服务器就可以对用户的输入做出响应。在访问一个网页时，鼠标在网页中进行鼠标点击或上下移、窗口移动等操作JavaScript都可直接对这些事件给出相应的响应。
## es6 模块
ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础</br>
所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化</br>
① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。</br>

② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。</br>

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。</br>
ES6 模块的运行机制与 CommonJS 不一样。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。</br>

## DOM渲染时机
宏任务：DOM渲染后触发，由浏览器规定（Web APIs）</br>
微任务：DOM渲染前执行，微任务是ES6语法规定

## 堆 heap 和栈 stack
**栈内存：** 引擎执行代码时工作的内存空间，除了引擎，也用来保存基本值和引用类型值的地址</br>
**堆内存：**用来保存一组无序且唯一的引用类型值，可以使用栈中的键名来取得</br>
null 作为一个Object类型的变量存储在栈内存中，因为堆内存存储的对象类型数据对于大小这方面，一般是未知的。</br>
栈内存中的变量一般是有已知大小或者范围上限的，算作是一种简单存储。</br>
**浅拷贝：**可以理解为，发生在栈中的拷贝行为，只能拷贝原始类型的值和引用类型的地址。</br>
**深拷贝：**可以理解为，同时发生在栈中和堆中的拷贝行为，除了拷贝基本值和引用值的地址之外，地址的对象也会发生拷贝。</br>
**垃圾回收：**栈内存变量基本上用完就回收了，而堆内存中的变量因为存在很多不确定的引用，只有当所有调用的变量全部销毁后，才回收。</br>
栈会自动分配内存空间，会自动释放</br>
堆动态分配的内存，大小不定也不会自动释放</br>
栈内存是由容量限制的，当递归调用次数过多，会导致超出栈的容量，从而导致栈溢出。

## 垃圾回收机制 Garbage Collection
程序工作过程中会产生很多垃圾，这些垃圾是程序不用的内存，
[laji](https://juejin.cn/post/6981588276356317214)

## 作用域
- [执行上下文](./context.md)
- [声明提升](./declaration.md)
- [作用域](./scope.md)
- [闭包](./closure.md)
## 原型链、继承

## Promise

## 深浅拷贝

## 事件机制/Event Loop

## Web Worker

## 函数式编程
### 柯里化

## ES6特性和新增方法

## 全等，不全等
1. 不全等，值比较前会先将类型转换，转换后，对值进行比较
2. 全等，不会进行类型转换，只有类型相同以及值相同，才返回true
3. Object.is() 行为与全等类似，但是 +0和-0不等，null等于它自身

## 事件捕获和冒泡
addEventListener true 表示在捕获阶段执行回调函数 false表示在冒泡阶段执行回调函数</br>
事件代理(事件委托)</br>
回调函数中的this指向当前元素</br>
第三个参数涉及到冒泡和捕获，是true时为捕获，是false则为冒泡。
或者是一个对象{passive: true}，针对的是Safari浏览器，禁止/开启使用滚动的时候要用到。</br>

1. 阻止冒泡</br>
e.stopPropagation()阻止冒泡</br>
handler中return false,不仅阻止了事件冒泡，而且阻止了事件本身（默认事件）</br>
event.target = event.currentTarget 让触发事件的元素等于绑定事件的元素，也可以阻止冒泡
2. 阻止默认事件</br>
event.preventDefault()</br>
return false </br>

## addEventListener 和onclik的区别

## 闭包
全局作用域，函数作用域，</br>
词法作用域，函数声明时就已经确定了</br>
事件的回调函数中，使用了外部的变量</br>
垃圾回收机制：标记清除[内存碎片化-空闲块，找不到需要的内存块，分配速度慢]，标记整理</br>
单例模式</br>

## for of 
for of 遍历依赖的是遍历器Iterator</br>
迭代器提供了一种不依赖索引取值的方式，它们的原型中都有一个Symbol.iterator方法</br>
1.数组Array2.String,3.Map,4.Set,5.arguments,6.Typed Arrays,7.Generators</br>
对象本身没有内置的遍历器，因此无法被 for of 遍历。</br>
`Set.prototype[Symbol.iterator] // f values(){[native code]}`