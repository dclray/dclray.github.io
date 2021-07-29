---
title: 算法
date: 2021-07-27
sidebar: auto
---
### 斐波那契数列
描述：斐波那契额数列，通常用F(n)表示，形成的序列称为斐波那契额数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是
``` javascript
// F(0) =0, F(1) = 1;
// F(n) = F(n-1) + F(n-2); 其中n>1;
function fib(n){
    if(n ===0) return 0;
    let n1 = 1, n2 = 1;
    for(let i = 2; i < n; i++){
        [n1, n2] = [n2, n1 + n2];
    }
    return n2;
}
```
### 合并两个排序的链表
``` javascript
/**
* function ListNode(val){
*    this.val = val;
*    this.next = null;
*}
*/
function mergeTwoLists (l1,l2){
    if(!l1) return l2;
    if(!l2) return l1;
    let start = new ListNode(0);
    const root = start;
    while(l1 && l2){
        if(l1.val > l2.val){
            start.next = l2;
            start = start.next;
            l2 = l2.next;
        }else{
            start.next = l1;
            start = start.next;
            l1 = l1.next;
        }
    }
    if(l1){
        start.next = l1;
    }
    if(l2){
        start.next = l2;
    }
    return root.next;
}
```
### 反转链表
``` javascript 
function reverseList (head){
  let prev = null,cur = head,next = head;
  while(next){
      next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
  }
  return prev;
}
```
### 判断链表是否有环
``` javascript
function hasCycle(head){
    if(head ===null) return false;
    let fast = head,slow = head;
    while(fast !==null && fast.next !== null){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            return true
        }
    }
    return false;
}
```
### 给定一个只包括 ”(“，“)”，“{”，“}”，“[”，“]” 的字符串 s ，判断字符串是否有效。
```javascript 
function isValid(s){
    let m = new Map([['(',')'],['{','}'],['[',']']]);
    let stack = [];
    for(let i = 0; i < s.length; i++){
        if(m.has(s[i])){
            stack.push(m.get(s[i]));
        }else{
            if(stack.pop() !== s[i]){
                return false
            }
        }
    }
    if(stack.length > 0){
        return false
    }else{
        return true;
    }
}
```