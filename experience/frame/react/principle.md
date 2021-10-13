---
title: 架构原理
date: 2021-09-16
sidebar: auto
---
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
## React16架构
React16架构可以分为三层：
- Scheduler（调度器）——调度任务的优先级，高优先级任务先进入Reconciler
- Reconciler（协调器）——负责找出变化的组件
- Renderer（渲染器）——负责将变化的组件渲染到页面上
相较于React15，React16增加了Scheduler
## Scheduler
以浏览器是否有剩余时间作为任务中断的标准，在浏览器中`requestIdleCallback`这个函数但是React放弃使用
- 浏览器兼容性
- 出发频率不稳定
基于以上原因，React做了polyfill，这就是Scheduler。</br>
## Reconciler(协调器)
stack Reconciler是递归处理虚拟DOM的</br>
以前的Reconciler被命名为stack Reconciler，stackReconciler运作的过程是不能被打断的，必须一直运行</br>
Fiber Reconciler每执行一段时间，都会将控制权交还给浏览器，可以分段执行，为了达到这种效果，需要一个调度器Scheduler来运行任务分配。<br/>
在React16中 当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增删更新的标记，整个Scheduler
与Reconciler的工作都在内存中进行。只有当所有的组件都完成Reconciler的工作，才会统一交给Renderer</br>
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
## Renderer（渲染器）
Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。
## 双缓存
在内存中构建并直接替换的技术叫做双缓存</br>
React中使用双缓存来完成Fiber树的构建和替换对应DOM树的创建和更新
## 双缓存Fiber树
在React中做多同时存在两颗Fiber树，当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。
current Fiber树中的Fiber节点被称为current fiber，workInProgress Fiber树中的Fiber节点被称为workInProgress fiber，他们通过alternate属性连接。</br>
React应用的根节点通过使current指针在不同的Fiber树的rootFiber间切换来完成current Fiber树指向的切换。
## react diff
**tree diff**:</br>
- 两棵树只对同一层级节点进行比较，只要该节点不存在了，那么该节点与其子节点会被完全删除，不在进行比较
**component diff**:</br>
- 同类型的组件，按照tree diff 比较virtual dom
- 同类型组件，组件A转化为了组件B，如果virtual dom无变化，可以通过shouldComponentUpdate方法来判断是否重新渲染
- 不同类型的组件，那么diff算法会把改变的组件判断为dirty component从而替换整个组件的所有节点
**element diff**:</br>
- 插入：新的组件不在原来的tree中，而是全新的节点，则进行插入操作
- 删除：组件在原来的tree中，但是更新了，则进行删除操作。
- 移动：组件存在原来的tree中，但是位置发生改变，如果没有key值进行区分，则删除旧的，插入新的，如果存在唯一key值，进行移动操作

缺点，如果是最后一个到最前面的一个，则所有的element都要发生变动，会造成性能问题

