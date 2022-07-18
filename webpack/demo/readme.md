## Demo

 "webpack": "^5.72.1"

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

### Tree Shaking 特殊场景

* 如果函数是简单的 ArrowFunctionExpression ( e.g. const fn = ()=>true ) 则可以 tree shake 掉；
* 如果是 BlockStatement ( e.g. ()=>{ return true } )则会失败；
* switch 放在函数内部则可被 tree shake，放在函数外部则不可做 tree shake

```js
// 不可以 shake 成功，可能原因：包含 BlockStatement
export const isNormalPortal = ()=>{
    ENV_IS_NORMAL_PORTAL
}

// 可以 shake 成功；可能原因：只包含 ArrowFunctionExpression 
export const isNormalPortal = ()=>ENV_IS_NORMAL_PORTAL 
```
## Reference

* https://webpack.docschina.org/guides/tree-shaking/
