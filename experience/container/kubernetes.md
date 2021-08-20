---
title: Kubernetes
date: 2021-08-19
sidebar: auto
---
## Kubernetes
Kubernetes是一个开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。
Kubernetes一个核心的特点就是能够自主的管理容器来保证云平台中的容器按照用户的期望状态运行着，管理员可以加载一个微型服务，让规划器来找到合适的位置，同时，Kubernetes也系统提升工具以及人性化方面，让用户能够方便的部署自己的应用。




## Chart
Chart是Kubernets的单元



##  命令解析： 查找pod 
```bash
kubectl get pod -n 'namespace' | grep 'podnamepart'   //获得pod的名称
helm list | grep 'podname' // 获得pod的namespace
kubectl --namespace='namespace' exec -it 'podname' -- bash</br>
kubectl exec -it -n 'namespace' 'podname' -- bash
ls ,cat ....
-i: 交互式操作；-t：终端
```
