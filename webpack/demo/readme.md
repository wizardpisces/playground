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

webpack 在 build 的时默认做 tree shaking 跟 dead code elimination；
**大致过程**：
* build 的时候注入环境变量，然后逻辑分析时去除 false 代码块，如果false 代码块依赖的 import 在当前文件没有其他引用则会被完全移除，除非有 sideEffects（webpack默认会引入sideEffects)
sideEffects场景：
    1. 对 global prototype 修改
    2. Polyfill 类似 1
    3. 定时器 setTimeout 等

如何避免 sideEffects 引入，可以配置 package.json 的 sideEffects: false；webpack 识别 package.json 的 sideEffects配置（默认 true，也就是默认保留所有的 sideEffects）： 
* "sideEffects": true; 表明保留所有的地方的 sideEffects
* "sideEffects": false; 表明清理掉所有地方的 sideEffects
* 其他配置 参照 webpack 文档

### Tree Shaking 失效场景

* 如果函数是简单的 ArrowFunctionExpression ( e.g. const fn = ()=>true ) 则可以 tree shake 掉；
* 如果是 BlockStatement ( e.g. ()=>{ return true } )则会失败；

```js
// 包含了 BlockStatement
export const isNormalPortal = ()=>{
    ENV_IS_NORMAL_PORTAL
}

// 但是可以 shake 成功；可能是只包含简单的 ArrowFunctionExpression 
export const isNormalPortal = ()=>ENV_IS_NORMAL_PORTAL 
```
## Reference

* https://webpack.docschina.org/guides/tree-shaking/