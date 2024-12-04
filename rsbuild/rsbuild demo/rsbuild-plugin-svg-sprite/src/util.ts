import type { Output as OptimizedSvg, Config as OptimizeOptions } from 'svgo';
import type { ViteSvgIconsPlugin, FileStats, DomInject } from './typing';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import SVGCompiler from 'svg-baker';
import { optimize } from 'svgo';
import { SVG_DOM_ID, XMLNS, XMLNS_LINK } from './constants';

const normalizePath = (p: string) => {
  return path.normalize(p);
};

export async function createModuleCode(
  cache: Map<string, FileStats>,
  svgoOptions: OptimizeOptions,
  options: ViteSvgIconsPlugin
) {
  const { insertHtml, idSet } = await compilerIcons(cache, svgoOptions as OptimizeOptions, options);

  const xmlns = `xmlns="${XMLNS}"`;
  const xmlnsLink = `xmlns:xlink="${XMLNS_LINK}"`;
  const html = insertHtml
    .replace(new RegExp(xmlns, 'g'), '')
    .replace(new RegExp(xmlnsLink, 'g'), '');

  const code = `
       if (typeof window !== 'undefined') {
         function loadSvg() {
           var body = document.body;
           var svgDom = document.getElementById('${options.customDomId}');
           if(!svgDom) {
             svgDom = document.createElementNS('${XMLNS}', 'svg');
             svgDom.style.position = 'absolute';
             svgDom.style.width = '0';
             svgDom.style.height = '0';
             svgDom.id = '${options.customDomId}';
             svgDom.setAttribute('xmlns','${XMLNS}');
             svgDom.setAttribute('xmlns:link','${XMLNS_LINK}');
             svgDom.setAttribute('aria-hidden',true);
           }
           svgDom.innerHTML = ${JSON.stringify(html)};
           ${domInject(options.inject)}
         }
         if(document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', loadSvg);
         } else {
           loadSvg()
         }
      }
        `;
  return {
    code: `${code}`,
    idSet: `export default ${JSON.stringify(Array.from(idSet))}`
  };
}

function domInject(inject: DomInject = 'body-last') {
  switch (inject) {
    case 'body-first':
      return 'body.insertBefore(svgDom, body.firstChild);';
    default:
      return 'body.insertBefore(svgDom, body.lastChild);';
  }
}

/**
 * Preload all icons in advance
 * @param cache
 * @param options
 */
export async function compilerIcons(
  cache: Map<string, FileStats>,
  svgOptions: OptimizeOptions,
  options: ViteSvgIconsPlugin
) {
  const { iconDirs } = options;

  let insertHtml = '';
  const idSet = new Set<string>();

  for (const dir of iconDirs) {
    const svgFilsStats = fg.sync('**/*.svg', {
      cwd: dir,
      stats: true,
      absolute: true
    });

    for (const entry of svgFilsStats) {
      const { path, stats: { mtimeMs } = {} } = entry;
      const cacheStat = cache.get(path);
      let svgSymbol;
      let symbolId;
      let relativeName = '';

      const getSymbol = async () => {
        relativeName = normalizePath(path).replace(normalizePath(dir + '/'), '');
        symbolId = createSymbolId(relativeName, options);
        svgSymbol = await compilerIcon(path, symbolId, svgOptions);
        idSet.add(symbolId);
      };

      if (cacheStat) {
        if (cacheStat.mtimeMs !== mtimeMs) {
          await getSymbol();
        } else {
          svgSymbol = cacheStat.code;
          symbolId = cacheStat.symbolId;
          symbolId && idSet.add(symbolId);
        }
      } else {
        await getSymbol();
      }

      svgSymbol &&
        cache.set(path, {
          mtimeMs,
          relativeName,
          code: svgSymbol,
          symbolId
        });
      insertHtml += `${svgSymbol || ''}`;
    }
  }
  return { insertHtml, idSet };
}

export async function compilerIcon(
  file: string,
  symbolId: string,
  svgOptions: OptimizeOptions
): Promise<string | null> {
  if (!file) {
    return null;
  }

  let content = fs.readFileSync(file, 'utf-8');

  if (svgOptions) {
    const { data } = (await optimize(content, svgOptions)) as OptimizedSvg;
    content = data || content;
  }

  // fix cannot change svg color  by  parent node problem
  content = content.replace(/stroke="[a-zA-Z#0-9]*"/, 'stroke="currentColor"');
  const svgSymbol = await new SVGCompiler().addSymbol({
    id: symbolId,
    content,
    path: file
  });
  return svgSymbol.render();
}

export function createSymbolId(name: string, options: ViteSvgIconsPlugin) {
  const { symbolId } = options;

  if (!symbolId) {
    return name;
  }

  let id = symbolId;
  let fName = name;

  const { fileName = '', dirName } = discreteDir(name);
  if (symbolId.includes('[dir]')) {
    id = id.replace(/\[dir\]/g, dirName);
    if (!dirName) {
      id = id.replace('--', '-');
    }
    fName = fileName;
  }
  id = id.replace(/\[name\]/g, fName);
  return id.replace(path.extname(id), '');
}

export function discreteDir(name: string) {
  if (!normalizePath(name).includes('/')) {
    return {
      fileName: name,
      dirName: ''
    };
  }
  const strList = name.split('/');
  const fileName = strList.pop();
  const dirName = strList.join('-');
  return { fileName, dirName };
}
