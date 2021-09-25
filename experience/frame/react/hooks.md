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

## useState和useReducer
useState和useReducer来管理React组件中的状态
useState -- 基础类型变量
useReducer --- Object或者arry这种引用类型的数据
```javascript
    const dataFetchReducer = (state,action)=>{
        switch(action.type){
            case 'Fetch_init':
                return {
                    ...state,
                    isLoading:true,
                    isError:false,
                };
            case 'Fecth_success':
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    data:action.payload
                };
            case 'Fetch_failure':
                return {
                    ...state,
                    isLoading:false,
                    isError:true,
                };
            default:
                throw new Error();
        }
    }
    const [state,dispatch] = useReducer(dataFetchReducer,{isLoading:false,isError:false,data:initData})

    const handlerInitData = ()=>{
        dispatch({type:"Fetch_init"})
    }
    const fetchData = ()=>{
        axios.get().then(res=>{
            dispatch({type:"Fetch_success",payload:res.data})
        }).catch(e=>{
            dispatch({type:"Fetch_failure"})
        })
    }
    
```
useState
- state是JavaScript基础类型
- state变化很简单
- 业务逻辑在组件内就能完成
- 多个state间的变化没有相互关系可以用多个useState进行管理
- state和你的组件是解耦的共处同一个组件中
- 一个很小的应用
useReducer
- state是数组或者对象
- 复杂的state变化
- 复杂的业务逻辑
- 不同的属性被捆绑在了一起必须使用一个state Object对象进行统一管理
- 需要更新更深组件树更深层次的state
- 中等大小的应用
- 需要更编辑的测试
- 需要更加可以预测和可以维护的state架构
## useRef和forwardRef
useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数。返回的ref对象在组件的整个生命周期内保持不变。这个ref对象只有一个current属性，他的地址一直不变。
useRef变化不会主动使页面渲染，可以将current变化的操作放在useState或者useReducer之前。
```javascript
    function CustomTextInput(props){
        const textInput = useRef(null);
        function handleClick(){
            textInput.current.focus();
        }
        return (
            <div>
                <Child ref ={textInput}/>
                <input type="button" value="focus the text" onClick={handleClick}>
            </div>)
    }
    const Child = forwardRef((props,ref)=>{
        return <input type="text" ref = {ref}>
    })
```
## useMemo和React.memo()
当数据变化时，代码会重新执行一遍，但是子组件数据没有变化也会执行，这个时候可以使用React.memo将子组件封装起来，让子组件的数据只在发生改变时才会执行</br>
React.memo仅检查props变更，如果函数组件被React。memo包裹，且其实现中拥有useState,useReducer或useContext的Hook，当state或context发生变化时，它仍然会重新渲染。默认情况下，其只会对复杂对象做浅层对比，如果你想要控制对比过程，可以自定义比较函数通过第二个参数传入来实现。</br>
useMemo解决函数更新而渲染自己的问题，就可以使用useMemo
## useMemo和useCallback
useMemo解决函数更新而渲染自己的问题，就可以使用useMemo
useCallback和useMemo参数相同，第一个参数是函数，第二个参数是依赖项的数组。主要的区别是useMemo将调用fn函数并返回其结果，而useCallback将返回fn的函数而不调用
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

## useState是异步还是同步 setState
setState并不是异步的方法，但是异步的表现是因为react框架本身的性能机制。
react中优化除了virtualDOM的优化，减少数据更新的频率是另外的一种手段，这就是React的批量更新

在合成事件和生命周期钩子函数中（除componentDidUpdate），setState的表现都是异步的。这是因为，当更新策略正在事务流的执行中时，组件更新会被推入dirtyComponents队列中等待执行，否则开始执行batchedUpdates队列更新。而在生命周期钩子调用中，更新策略都处于更新之前，组件仍处于事务流中，而componentDidUpdate是在更新之后，此时组件已经不在事务流中，因此表现为同步。在合成事件中，react是基于事务流完成的事件委托机制实现，也是处于事务流中。

总结,合成事件和生命周期钩子函数都是在事务流中执行，而setState（组件更新）运行是在事务流之后，所以表现为异步。
这是无法在setState后马上获得更新之后的值。解决方法，在setState(updater,callback)，在回调中获取最新值

在原生事件和setTimeout中，setState表现为同步，可以马上获取更新后的值

原因：原生事件是浏览器本身的实现，与事务流无关，而setTimeout是放置在宏任务中延后执行，此时事务流已经结束。

批量更新，在合成事件和声明周期钩子中，setState更新队列，存储的是合并状态，因此前面设置的key值会被后面的所覆盖，最终只会执行一次更新。
函数式：由于Fiber及合并的问题，官方推荐可以传入函数的形式，在fn中返回新的State对象，this.setState((state,props)=>newState)使用函数式可以用于避免setState的批量更新的逻辑，传入的函数将会被顺序调用。

## 合成事件

## 路由

## 高阶组件
高阶组件不是组件，是增强函数，可以输入一个元组件，返回一个新的增强组件
高阶组件的主要作用是代码复用，操作状态和参数

