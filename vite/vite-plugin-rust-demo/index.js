import { transformCode } from '../../rust-vite-demo-plugin/vite-wrapper.js'

export default function vitePluginRustDemo() {
  return {
    name: 'vite-plugin-rust-demo',
    transform(code, id) {
      if (id.endsWith('.js')) {
        return transformCode(code);
      }
      return code;
    },
  };
};