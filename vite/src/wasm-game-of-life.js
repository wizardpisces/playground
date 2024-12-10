import init, { greet } from "../wasm-game-of-life/pkg/wasm_game_of_life.js";

// 初始化 WebAssembly 模块
(async () => {
  await init();
  greet();
})();