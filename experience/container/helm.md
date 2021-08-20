---
title: Helm
date: 2021-08-20
sidebar: auto
---
## Helm
Helm 帮助用户管理Kubernetes应用程序，帮助定义、安装和升级最复杂的Kubernetes应用程序。</br>
Helm可以使用Charts启动Kubernetes集群，提供可用的工作流：</br>
- 一个Redis集群
- 一个Postgres数据库
- 一个HAProxy边界负载均衡
特性：</br>
- 查找并使用流行的软件，将其打包为Helm Charts，以便再kubernetes中运行
- 以Helm Charts的形式共享自己的应用程序
- 智能地管理用户的Kubernetes清单文件
- 管理Heml包的发行版

Helm是管理Kubernetes包的工具，Helm能提供一下能力：
- 创建新的charts
- 将charts打包成tgz文件
- 与chart仓库交互
- 安装和卸载Kubernetes的应用
- 管理使用Helm安装的charts的生命周期

在Helm中，有三个需要了解的重要概念:
- chart：是创建Kubernetes应用实例的信息集合
- config：创建发布对象的chart的配置信息
- release：chart的运行实例，包含特定的config

在Helm中，有四个需要了解的重要命令：
- helm version
- helm list
- helm install -n demohelm demohelm
- helm delete --purge demohelm