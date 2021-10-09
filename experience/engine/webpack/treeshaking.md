---
title: tree-shaking
date: 2021-10-09
sidebar: auto
---
## tree-shaking
```javascript
/**
 * 1.处于生产模式，webpack只有在压缩代码时才会tree-shaking
 * 2.usedExports设置为true，
 * 3.支持删除死代码的压缩器 terser-webpack-plugin,terserPlugin**/
 optimization: {
  usedExports: true, // 开启tree-shaking的关键
  minimizer: [
   new TerserPlugin({...})
  ]
 }
```