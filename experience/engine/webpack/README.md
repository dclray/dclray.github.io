---
title: Webpack知识
date: 2021-07-13
sidebar: auto
---


本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## entry （入口）
入口起点（entry point）即是webpack通过该起点找到本次项目所直接或间接依赖的资源（模块、库等），并对其进行处理，最后输出到bundle中，入口文件由用户自定义，可以是一个或者多个，每一个entry最后对应一个bundle。

## output （出口）
通过配置output属性可以告诉webpack将bundle命名并输出到对应的位置。

## loader
webpack核心，webpack本身只能识别JS文件，对于非JS文件，就需要loader转换为JS文件。换句话说，loader就是资源转换器。由于webpack中，所有的资源都是模块，不同资源都最终转化成JS去处理。针对不同形式的资源采用不同的loader去编译，这就是loader的意义。

## plugin（插件）
webpack核心，loader处理非JS文件，那么插件可以有更广泛的用途。整个webpack其实就是各类的插件形成的，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

## chunk
被entry所依赖的额外的代码块，同样可以包含一个或者多个文件。chunk也就是一个个的JS文件，在异步加载中用处很大。chunk实际上就是webpack打包后的产物，如果你不想最后生成一个包含所有的bundle，那么可以生成一个个的chunk，并通过按需加载引入。同时它还能够通过插件提取公共依赖，生成公共chunk，避免多个bundle中有多个相同的依赖代码。

## dev热更新慢，打包慢
按需加载
[分割代码按需加载](https://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-12%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD.html)
[揭秘webpack按需加载原理](https://juejin.cn/post/6850418111599165448)