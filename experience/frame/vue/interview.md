---
title: Vue面试题
date: 2021-08-26
sidebar: auto
---

## 介绍下Vue的响应式系统
Vue为MVVM框架，当数据模型data变化时，页面视图会得到响应更新，其原理是对data的getter/setter方法进行拦截（`Object.defineProperty`或者`Proxy`），利用发布订阅模式，在getter方法中进行订阅，在setter方法中发布通知，让所有的订阅者完成响应。

在响应式系统中，Vue会为数据模型data的每一个属性新建一个订阅中心作为发布者，而监听器watch、计算属性computed、视图渲染template/render三个角色同时作为订阅者，对于监听器watch，会直接订阅观察监听的属性，对于计算属性computed和视图渲染template/render，如果内部执行获取了data的某个属性，就会执行该属性的getter方法，然后自动完成对该属性的订阅，当属性被修改时，就会执行该属性的setter方法，从而完成该属性的发布通知，通知所有订阅者进行更新。

## computed和watch的区别

计算属性computed和监听器watch都可以观察属性的变化从而做出响应，不同的是：</br>
计算属性computed更多是作为缓存功能的观察者，它可以将一个或者多个data的属性进行复杂的计算生成一个新的值，提供给渲染函数使用，当依赖的属性变化时，computed不会立即重新计算生成新的值，而是先标记为脏数据，当下次computed被获取时，才会进行重新计算并返回。而监听器watch并不具备缓存性，监听器watch提供一个监听函数，当监听的属性发生变化时，会立即执行该函数。

## 介绍下Vue的生命周期
**beforeCreate：**是new Vue()之后触发的第一个钩子函数，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。
**created：**在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过`vm.$nextTick`来访问DOM
**beforeMount：**发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟DOM已经创建完成，即开始渲染。在此时也可以对数据进行更改，不会触发updated。
**mounted：**在挂载完成后发生，在当前阶段，真是的DOM挂载完毕，数据完成双向数据绑定，可以访问到DOM节点，使用$refs属性对DOM操作。
**beforeUpdate：**发生在更新之前，也就是响应式数据发生更新，虚拟DOM重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染
**updated：**发生在更新完成之后，当前阶段组件DOM已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
**beforeDestroy：**发生在实例销毁前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如消除计时器
**destroyed：**发生在实例销毁之后，这个时候只剩下了DOM空壳。组件已被拆解，数据绑定被卸除，监听被移除，子实例也统统被销毁。
## 为什么组件的data必须是一个函数
一个组件可能在很多地方使用，也就是会创建很多个实例，如果data是一个对象的话，对象是引用类型，一个实例修改了data会影响到其他实例，所以data必须使用函数，为每一个实例创建一个属于自己的data，使其同一个组件的不同实例互不影响。
## slot是什么？有什么作用？原理是什么
slot又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。</br>
slot又分三类，默认插槽，具名插槽和作用域插槽。
- 默认插槽：又名匿名插槽，当slot没有指定name属性值的时候一个默认显示插槽，一个组件内只能有一个匿名插槽
- 具名插槽：带有具体名字的插槽，也就是带有name属性的slot，一个组件可以出现多个具名插槽
- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。
  
实现原理：当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在`vm.$slot`中，默认插槽为`vm.$slot.default`，具名插槽为`vm.$slot.xxx`，xxx为该插槽名，当组件执行渲染函数时候，遇到slot标签，使用`$slot`中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可以称该插槽为作用域插槽
```html 
    // 父组件
    <template>
        <div>
            <template v-slot:header = {user}>
                {{user.firstname}}
            </template>
        </div>
    </template>
    // 子组件
    <template>
        <slot name="header" :user="user">
            {{user.lastname}}
        </slot>
    </template>
    export default{
        data(){
            return {
                user:{
                    firstname:'dong',
                    lastname:'devin'
                }
            }
        }
    }
```
## Vue模板渲染的原理
vue中的模板template无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的HTML语法，所有需要将template转化成一个JavaScript函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。</br>
模板编译又分为三个阶段：解析parse，优化optimize，生成generate，最终生成可执行函数render</br>
- parse：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST
- optimize：遍历AST，找到其中的一些静态节点并进行标记，方便再页面重渲染的时候进行diff比较，直接跳过这一些静态节点，优化runtime性能
- generate：将最终的AST转化为render函数字符串

## template预编译是什么
对于Vue组件来说，模板编译只会在组件实例化的时候编译一次，生成渲染函数之后再也不会进行编译。因此，编译对组件的runtime是一种性能损耗。
而模板编译的目的仅仅是将template转化为renderfunction，这个过程，正好可以在项目构建的过程中完成，这样可以让实际组件在runtime时直接跳过模板渲染，进而提升性能，这个在项目构建的编译template的过程，就是预编译
## template和jsx有什么区别
对于runtime来说，只需要保证组件存在render函数即可，而有了预编译后，只需要保证构建过程中生成render函数就可以了
在webpack中，使用`vue-loader`编译.vue文件，内部依赖的`vue-template-compiler`模块，在webpack构建过程中，将template预编译成render函数。
与react类似，在添加了jsx的语法糖解析器`babel-plugin-transform-vue-jsx`之后，就可以直接手写render函数
所以，template和jsx都是render的一种表现形式，不同的是：
jsx相对于template而言，具有更高的灵活性，在复杂的组件中，更具有优势，而template虽然显得有些呆滞，但是template在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。