---
title: k8s
date: 2021-08-19
sidebar: auto
---
命令解析：
## 查找pod 
1. kubectl get pod -n 'namespace' | grep 'podnamepart'   //获得pod的名称
2. helm list | grep 'podname' // 获得pod的namespace
3. kubectl --namespace='namespace' exec -it 'podname' -- bash
   kubectl exec -it -n 'namespace' 'podname' -- bash
4. ls ,cat ....