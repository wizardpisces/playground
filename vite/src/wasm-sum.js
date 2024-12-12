
// import * as wasm from "wasm-game-of-life";

// wasm.initSync();
// wasm.greet();

import init, { sum } from "../wasm_sum/pkg/wasm_sum.js";
  
// 初始化 WebAssembly 模块
(async () => {
  await init();
  const result = sum(10, 20); // 调用 Rust 的 sum 函数
})();