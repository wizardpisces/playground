## Demo

webpack

* tree shaking
* dead code elimination
* side-effect处理

## How to run

```
npm run build
```

## 总结
***欢迎指正存疑点***

webpack 在 build 的时默认做 tree shaking + dead code elimination；
**大致过程**：
* build 的时候注入环境变量，然后逻辑分析去除永久不会进入的 false 代码块，然后移除当前文件没有被使用的 import 块，除非有 sideEffects（webpack默认会引入sideEffects）：
    1. 对 global prototype 修改
    2. Polyfill 类似 1
    3. 定时器 setTimeout 等

如何避免 sideEffects 引入，可以配置 package.json 的 "sideEffects: false；"，webpack 会识别 package.json 的 sideEffects配置： 
* "sideEffects": true; （默认值）表明保留所有的地方的 sideEffects
* "sideEffects": false; 表明清理掉所有地方的 sideEffects
* 其他配置 参照 webpack 文档


## Reference

* https://webpack.docschina.org/guides/tree-shaking/
