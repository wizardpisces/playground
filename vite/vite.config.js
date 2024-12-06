import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginRustDemo from './vite-plugin-rust-demo/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginRustDemo()],
  optimizeDeps: {
    exclude: ['vite-plugin-rust-demo'], // 排除包含 .node 文件的模块
  },
  build: {
    commonjsOptions: {
      include: [/\.node$/], // 包含 .node 文件
    }
  }
})
