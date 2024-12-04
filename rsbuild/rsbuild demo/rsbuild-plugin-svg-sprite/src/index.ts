import { RsbuildPlugin } from '@rsbuild/core';
import type { ViteSvgIconsPlugin, FileStats, DomInject } from './typing';
import { SVG_DOM_ID, XMLNS, XMLNS_LINK } from './constants';
import { createModuleCode } from './util';

export const RsbuildPluginSvgSprite = (opt: ViteSvgIconsPlugin): RsbuildPlugin => ({
  name: 'rsbuild-plugin-svg-sprite',
  setup: async (api) => {
    const cache = new Map<string, FileStats>();

    const options = {
      svgoOptions: {},
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last' as const,
      customDomId: SVG_DOM_ID,
      ...opt
    };

    const { svgoOptions } = options;
    const { symbolId } = options;

    if (!symbolId.includes('[name]')) {
      throw new Error('SymbolId must contain [name] string!');
    }

    const { code, idSet } = await createModuleCode(cache, svgoOptions, options);
    api.modifyHTMLTags(({ headTags, bodyTags }) => {
      // headTags.push({
      //   tag: 'script',
      //   attrs: { src: 'https://example.com/foo.js' }
      // });
      bodyTags.push({
        tag: 'script',
        children: code
      });

      return { headTags, bodyTags };
    });
  }
});
