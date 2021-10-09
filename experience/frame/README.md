---
title: theme-reco
date: 2020-05-29
---

## vue diff 和 react diff
vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。
1. vue比对节点，当节点元素类型相同，但是className不同，认为是不同类型元素，删除重建，而react会认为是同类型节点，只是修改节点属性
2. vue的列表比对，采用从两端到中间的比对方式，而react则采用从左到右依次比对的方式。当一个集合，只是把最后一个节点移动到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移动到第一个。总体上，vue的对比方式更高效。
## react 和 vue的区别

###  更新流程
 #### react 更新流程
 react 推崇数据不可变，他设计和vue完全不同，不是通过收集数据依赖去发现更新的，而是通过re-render去发现和更新自身。</br>
 react 要求我们使用setState 和 hook中的useState 的set数据去更新数据，进而触发更新。</br>
 setState -> re-render(beginWork 递 & completeWork归)-> commit

## qiankun
[qiankun发展](http://www.360doc.com/content/21/0406/11/11604731_970825947.shtml)