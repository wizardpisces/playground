import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { RsbuildPluginSvgSprite } from './rsbuild-plugin-svg-sprite';
import path from 'path';

export default defineConfig({
  plugins: [
    pluginReact(),
    RsbuildPluginSvgSprite({
      iconDirs: [path.resolve(__dirname, './src/svg')],
      symbolId: '[name]',
      inject: 'body-first'
    })
  ],
});
