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
### 计算属性computed
1. 支持缓存，只有依赖的数据发生改变，才重新计算
2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
3. computed属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个一多对一或者一对一，一般用computed
5. 如果computed属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当属变化时，调用set方法

### 监听器watch
1. 不支持缓存，数据发生变化，直接会触发相应的操作
2. watch支持异步，
3. 监听的函数接受两个参数，第一个参数是最新的值，第二个参数是输入之前的值
4. 当一个属性发生变化时，需要执行对应的操作；一对多
5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数
   immediate：组件加载立即触发回调函数执行
   deep：深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做，注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异，只有以响应式的方式触发才会被监听到。

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
## 什么是Virtual Dom
Virtual DOM是DOM节点在JavaScript中的一种抽象数据结构，之所以需要虚拟DOM，是因为浏览器中操作DOM的代价比较昂贵，频繁操作DOM会产生性能问题。虚拟DOM的作用是在每一次响应式数据发生变化引起页面重渲染时，Vue对比更新前后的虚拟DOM，匹配找出尽可能少的需要更新的真是DOM，从而达到提升性能的目的。
## vue中的diff算法
在新老虚拟DOM对比时
- 首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
- 如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况（如果新的children没有子节点，将旧的子节点移除）
- 比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作（diff核心）
- 匹配时，找到相同的子节点，递归比较子节点
  
在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂度从`O(n^3)`降低至`O(n)`，也就是说，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较
## key属性的作用是什么
在对节点进行diff的过程中，判断是否为相同节点的一个重要的条件是key是否相等，如果是相同节点，则会尽可能的复用原有的DOM节点。所以key属性是提供给框架在diff的时候使用的，而非开发者。

## vue2.0和vue3.0的区别
1. 重构响应式系统，使用proxy替换Object。defineProperty，使用Proxy优势：
   - 可直接监听数组类型的数据变化
   - 监听的目标为对象本身，不需要像`Object.defineProperty`一样遍历每个属性，有一定的性能提升
   - 可拦截apply、ownKeys、has等13种方法，而`Object.defineProperty`不行
   - 直接实现对象属性的新增/删除

2. 新增Composition API，更好的逻辑复用和代码组织
3. 重构Virtual DOM
   - 模板编译时的优化，将一些静态节点编译成常量
   - slot优化，将slot编译成lazy函数，将slot的渲染的决定权交给子组件
   - 模板中内联事件的提取并重用（原本每次渲染都重新生成内联函数）

4. 代码结构调整，更便于Tree Shaking，使得体积更小
5. 使用TypeScript替换Flow

## 为什么要新增Composition API，它能解决什么问题

Vue2.0中，随着功能的增加，组件变得越来越复杂，越来越难维护，而难以维护的根本原因时Vue的API设计迫使开发者使用watch，computed，methods选项组织代码，而不是实际的业务逻辑。

另外Vue2.0缺少一种较为简洁的低成本的机制来完成逻辑复用，虽然可以minxis完成逻辑复用，但是当mixin变多的时候，会使得难以找到对应的data、computed或者method来源于哪个mixin，使得类型推断难以进行。

所以Composition API的出现，主要也是为了解决Option API带来的问题，第一个是代码组织问题，Composition API可以让开发者根据业务逻辑组织自己的代码，让代码具备更好的可读性和可扩展性，也就是说当下一个开发者接触这一段不是他自己写的代码时,他可以更好的利用代码的组织反推出实际的业务逻辑,或者根据业务逻辑更好的理解代码

第二个是实现代码的逻辑提取与复用,当然mixin也可以实现逻辑提取与复用,但是像前面所说的,多个mixin作用在同一个组件时,很难看出property是来源于哪个mixin,来源不清楚,另外,多个mixin的property存在变量命名冲突的风险。而Composition API刚好解决了这两个问题。

## 都说Composition API与React Hook很像，有什么区别
从React Hook的实现角度看，React Hook是根据useState调用的顺序来确定下一重渲染时的state是来源于哪个useState，所以出现了以下限制：
- 不能在循环、条件、嵌套函数中调用Hook
- 必须确保总是在你的React函数的顶层调用Hook
- useEffect、useMemo等函数必须手动确定依赖关系

而Composition API是基于Vue的响应式系统实现的，与React Hook的相比：
- 声明在setup函数内，一次组件实例化只调用一次setup，而React Hook每次重渲染都需要调用Hook，使得React的GC比Vue更有压力，性能也相对于Vue来说也较慢
- CompositionAPI的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
- 响应式系统自动实现了依赖手机，进而组件的部分的性能优化由Vue内部自己完成，而ReactHook需要手动传入依赖，而且必须保证依赖的顺序，让useEffect、useMeme等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降

虽然Composition API看起来比React Hook好用，但是其实际思想也是借鉴React Hook的。

## SSR有了解吗，原理是什么
在客户端请求服务器的时候，服务器的数据库中获取到相关的数据，并且在服务器内部将Vue组件渲染成HTML，并且将数据、HTML一并返回给客户端，这个在服务器将数据和组件转化为HTML的过程，叫做服务端渲染SSR。

而当客户端拿到服务器渲染的HTML和数据之后，由于数据已经有了，客户端不需要再一次请求数据，而只需要将数据同步到组件或者Vuex内部即可。除了数据以外，HTML结构已经有了，客户端在渲染组件的时候，也只需要将HTML的DOM节点映射到VirtualDOM 即可，不需要重新创建DOM节点，这个数据和HTML同步的过程，又叫做客户端激活。
使用SSR的好处：
- 有利于SEO：其实就是有利于爬虫来爬你的页面，因为部分页面爬虫是不支持执行JavaScript的，这种不支持执行JavaScript的爬虫抓取到非SSR的页面会是一个空的HTML页面，而有了SSR以后，这些爬虫就可以获取到完整的HTML结构的数据，进而收录到搜索引擎中。
- 白屏时间更短：相对于客户端渲染，服务端渲染在浏览器请求URL之后已经得到了一个带有数据的HTML文本，浏览器只需要解析HTML，直接构建DOM树就可以。而客户端渲染，需要先得到一个空的HTML页面，这个时候页面已经进入白屏，之后还需要经过加载并执行JavaScript、请求后端服务器获取数据、JavaScript渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载JavaScript脚本，越是复杂的应用，需要加载的JavaScript脚本越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。

## nextTick原理
### js执行机制
由于js是单线程，js设计者把任务分为同步任务和异步任务，同步任务都在主线程上排队执行，前面任务没有执行完成，后面的任务会一直等待；异步任务则是挂在在一个任务队列里，等待主线程所有任务执行完成后，通知任务队列可以把可执行的任务放到主线程执行。异步任务放到主线程执行完后，又通知任务队列把下一个异步任务放到主线程中执行。这个过程一直持续，直到异步任务执行完成，这个持续重复的过程就叫Event loop。而一次循环就是一次tick 。</br>
在任务队列中的异步任务又可以分为两种microtast（微任务） 和 macrotask（宏任务）</br>
microtast（微任务）：Promise， process.nextTick， Object.observe， MutationObserver</br>
macrotask（宏任务）：script整体代码、setTimeout、 setInterval等</br>
执行优先级上，先执行宏任务macrotask，再执行微任务mincrotask。

[nextTick](https://juejin.cn/post/6844904169967452174)
[js](https://segmentfault.com/a/1190000037516439)

## vue 父子组件间的生命周期
父组件 beforeCreate -> created -> beforeMount ->子组件 beforeCreate- created- beforeMount- mounted ->mounted;


