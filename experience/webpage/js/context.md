---
title: 执行上下文
date: 2021-08-04
sidebar: auto
---
## 什么是执行上下文
简而言之，执行上下文是评估和执行JavaScript代码的环境的抽象概念。每当JavaScript代码在运行的时候，它都是在执行上下文中运行。

## 执行上下文的类型
JavaScript中有三种执行上下文的类型。
- **全局执行上下文**——这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的Window对象（浏览器的环境下），并且设置`this`的值等于这个对象。一个程序中只会有一个全局执行上下文。
- **函数执行上下文**——每当一个函数被调用时，都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤。
- **Eval函数执行上下文**——执行在`eval`函数内部的代码也会有属于它自己的执行上下文，但由于JavaScript开发中并不经常使用`eval`，所以不过多讨论。
  
## 执行栈
执行栈，也就是在其他编程语言中所说的“调用栈”，是一种拥有LIFO（后进先出）数据结构的栈，被用来存储代码执行时创建的所有执行上下文。</br>
当JavaScript引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈顶。</br>
引擎会执行那些执行上下文位于栈顶的函数。当函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

代码示例：
```javascript
let a = "Hello Devin";
const first = function (){
    console.log("First")
    second();
}
const second = function(){
    console.log("Second");
}
first();
```
当上述代码在浏览器中运行时，JavaScript引擎创建了一个全局执行上下文并把它压入当前执行栈。当遇到`first()`函数调用时，JavaScript引擎为该函数创建一个新的执行上下文并把它压入当前执行栈的顶部。</br>
当从`first()`函数内部调用`second()`函数时，JavaScript引擎为`second()`函数创建了一个新的执行上下文并把它压入当前执行栈的顶部。当`second()`函数执行完毕，它的执行上下文会从当前栈弹出，并且控制流程到达下一个执行上下文，即`first()`函数的执行上下文。</br>
当`first()`函数执行完毕，他的执行上下文从栈弹出，控制流程到达全局执行上下文。一旦所有代码执行完毕，JavaScript引擎从当前栈中移除全局执行上下文。

## 怎么创建执行上下文
我们已经了解了怎样管理执行上下文了，那么JavaScript引擎是如何创建执行上下文的</br>
创建执行上下文有两个阶段：**1.创建阶段** **2.执行阶段**</br>
在JavaScript代码执行前，执行上下文将经历创建阶段。在创建阶段会发生三件事：
1. `this`值的决定，即`this`的绑定
2. 创建词法环境组件
3. 创建变量环境组件
   
执行上下文在概念上表示如下：
```javascript
ExectionContent= {
    ThisBinding = <this value>,
    LexicalEnvironment = {...},
    VariableEnvironment = {...}
}
```
 ### this绑定：
 在全局执行上下文中，`this`的值指向全局对象。（在浏览器中，`this`指向Window对象）。</br>
 在函数执行上下文中，`this`的值取决于该函数是如何被调用的。如果他被一个引用对象调用，那么`this`会被设置成那个对象，否则`this`的值被设置为全局对象或者`undefined`（在严格模式下）

 ### 词法环境
 [官方的ES6](https://262.ecma-international.org/6.0/)文档把词法环境定义为
 > **词法环境**是一种规范类型，基于ECMAScript代码的词法嵌套结构来定义标识符和具体变量和函数的关联。一个词法环境由环境记录器和一个可能的引用外部词法环境的空值组成。

简单来说词法环境是一种持有标识符——变量映射的结构。（这里的标识符指的是变量/函数的名字，而变量是对实际对象[包含函数类型对象]或原始数据的引用）。</br>
现在，在词法环境的内部有两个组件：1.环境记录器 2. 一个外部环境的引用 </br>
1. **环境记录器**是存储变量和函数声明的实际位置
2. **外部环境的引用**意味着它可以访问其父级词法环境（作用域）
词法环境有两种类型：</br>
- **全局环境**（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是`null`。它拥有内建的Object/Array/等、在环境纪录器内的原型函数（关联全局对象，比如window对象）还有任何用户定义的全局变量，并且`this`的值指向全局对象。
- 在**函数环境**中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。

环境记录器也有两种类型：</br>
- 在全局环境中，环境记录器是对象环境记录器
- 在函数环境中，环境记录器是声明式环境记录器

::: tip
对于函数环境，声明式环境记录器还包含了一个传递给函数的`arguments`对象（此对象存储索引和参数的映射）和传递给函数的参数的length.
:::
用伪代码表示词法环境
```javascript
GlobalExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Object",
            // 在这里绑定标识符
        }
        outer: <null>
    }
}
FunctionExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Declarative",
        // 在这里绑定标识符
        }
        outer: <Global or outer function environment reference>
    }
}
```
### 变量环境：
它同样是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。</br>
如上所述，变量环境也是一个词法环境，所以它有着上面定义的词法环境的所有属性。</br>
在ES6中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（`let`和`const`）绑定，而后者只用来存储`var`变量绑定。</br>
样例代码：
```javascript
let a = 20;
const b = 30;
var c ;
function multiply(e,f){
    var g = 20;
    return e* f* g;
}
c = multify(a,b)
```
用伪代码表示执行上下文：
```javascript 
GlobalExectionContext = {
    ThisBinding:<Global Object>,
    LexicalEnvironment:{
        EnvironmentRecord:{
            Type:"Object",
            a:<uninitialized>,
            b:<uninitialized>,
            multiply:<func>
        }
        outer:<null>
    }
    VariableEnvironment:{
        EnvironmentRecord:{
            Type:"Object",
            c:undefined
        }
        outer:<null>
    }
}
FunctionExectionContext = {
    ThisBinding:<Global Object>,
    LexicalEnvironment:{
        EnvironmentRecord:{
            Type:"Declarative",
            Arguments:{0:20,1:30,length:2}
        },
        outer:<GlobalLexicalEnvironment>
    },
    VariableEnvironment:{
        EnvironmentRecord:{
            Type:"Declarative",
            g:undefined
        },
        outer:<GlobalLexicalEnvironment>
    }
}

```
:::tip
注意 —— 只有遇到调用函数`multiply`时，函数执行上下文才会被创建。
:::
`let`和`const`定义的变量并没有关联任何值，但`var`定义的变量被设成了`undefined`。</br>
这是因为在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为`undefined`（var的情况下），或者未初始化（`let`和`const`情况下）。</br>
这就是为什么可以在声明之前访问`var`定义的变量（虽然是 `undefined`），但是在声明之前访问`let`和`const`的变量会得到一个引用错误。</br>
这就是我们说的[**变量声明提升**](./declaration.md) 