---
title: Hooks
date: 2021-08-02
sidebar: auto
---
## Hooks
- useState: 组件更新
- useEffect: 执行副作用
- useRef: 保存数据
- useMemo: 缓存优化

## 数据变化-数据渲染到页面
数据发生变化到将数据渲染到页面有两个阶段：`render`阶段和`commit`阶段</br>
react的生命周期函数，在调用`this.setState`后首先会计算出状态变化，接着将状态变化渲染在视图中</br>
**render阶段：** 计算出状态变化（负责调用组件生命周期方法，进行Diff运算）；**commit阶段：** 将状态变化渲染到视图中（根据不同的平台，渲染出响应的页面）</br>
render阶段中有Reconciler层，而Fiber优化，就发生在Reconciler中，因此也叫做Fiber Reconciler。Fiber其实是一种数据结构，可以用一个纯JS对象来表示：
```javascript
const fiber = {
    stateNode, //节点实例
    child,//子节点
    sibling,//兄弟节点
    return,//父节点
}
```
以前的Reconciler被命名为stack Reconciler，stackReconciler运作的过程是不能被打断的，必须一直运行</br>
Fiber Reconciler每执行一段时间，都会将控制权交还给浏览器，可以分段执行，为了达到这种效果，需要一个调度器Scheduler来运行任务分配。<br/>
Fiber Reconciler在执行过程中又可以分为两个阶段：
1. 生成Fiber树（这棵树是在VirtualDOM树的基础上增加额外的信息来生成的，它的本质是一个链表），得出需要更新的节点信息，这个过程是一个渐进的过程，可以被打断
2. 将需要更新的节点一次批量更新，这个过程不能被打断


render阶段到commit阶段传递了一条包含了不同fiber节点的effect的链表</br>
- 对于要**插入DOM**的元素我们会在对应的fiber节点上增加**Placement** effect，
- 对于需要**更新DOM**的元素，我们会在对应的fiber节点上增加**Update** effect，
- 对于需要**删除DOM**的元素，我们会在对应的fiber节点上增加**Deletion** effect，
- 对于需要**更新ref属性的DOM**元素，我哦们会在对应的fiber上增加**Ref** effect，
- 对于包含**useEffect回调执行的fiber**来说，我们会在对应的fiber上增加**passive** effect，
- 总之，所有与视图相关的操作都有对应的effect</br>

在commit阶段是如何处理链表的每个effect的，commit阶段将状态变化渲染到视图中，更进一步是将effect渲染在视图中，commit阶段又分为三个阶段</br>
1. 渲染视图前（beforeMutation阶段）
2. 渲染视图（mutation阶段）
3. 渲染视图后（layout阶段）</br>

placement的effect在mutation阶段执行对DOM节点appendChild操作，这样我们的DOM节点就会被插入到视图中</br>
接下来会在layout阶段调用componentDidMount</br>
对于passiveEffect来说它会在commit阶段的三个子阶段完成以后异步调用useEffect的回调函数

## useEffect(fn,[]) 和 componentDidMount有什么区别
**useEffect第二个参数[ ]是如何影响fn的执行的**</br>
没有第二个参数，第二个参数是空数组，第二个参数有值
- 在没有第二个参数时，会在组件mount时创建passiveEffect，在组件update时创建passiveEffect，因此在每次render时都会创建passiveEffect
- 第二个参数为空数组时，它会在mount时创建passiveEffect
- 第二个参数包含一个依赖项时，它会在mount时以及依赖项发生变化时创建passiveEffect
  
**fn与componentDidMount的执行时机有什么不同** </br>
- useEffect会在commit阶段执行完成以后异步的调用回调函数
- componetDidMount则会在layout这个子阶段同步的调用
- useEffect的fn和componentDidMount的执行时机是完全不同的
   
useLayoutEffect hook 它的调用时机和componentDidMount一致的，它也会在layout阶段同步调用</br>
**useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染**

