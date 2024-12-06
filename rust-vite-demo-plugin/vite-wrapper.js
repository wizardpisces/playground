import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 使用 require 导入原始的 CommonJS 模块
const nativeModule = require('./index.js');

// 重新导出为 ESM
export const sum = nativeModule.sum;
export const transformCode = nativeModule.transformCode;
