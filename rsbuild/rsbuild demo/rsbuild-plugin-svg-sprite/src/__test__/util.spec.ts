import { createModuleCode, compilerIcons, compilerIcon, createSymbolId } from '../util';
import { SVG_DOM_ID } from '../constants';
import { ViteSvgIconsPlugin } from '../typing';

// Mock fs module
// jest.mock('fs');
jest.mock('fast-glob', () => ({
  sync: jest.fn(() => [/* mock data */])
}));

describe('SVG Sprite Plugin Utilities', () => {
  const mockCache = new Map();
  const mockOptions: ViteSvgIconsPlugin = {
    iconDirs: ['icons'],
    symbolId: 'icon-[dir]-[name]',
    customDomId: SVG_DOM_ID,
    inject: 'body-last'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createModuleCode should generate correct module code', async () => {
    const svgoOptions = {};
    const { code, idSet } = await createModuleCode(mockCache, svgoOptions, mockOptions);
    console.log('code', code);
    expect(code).toContain('function loadSvg()');
    expect(idSet).toBeDefined();
  });

  test('compilerIcons should process icons correctly', async () => {
    const svgOptions = {};
    const { insertHtml, idSet } = await compilerIcons(mockCache, svgOptions, mockOptions);

    expect(insertHtml).toBeDefined();
    expect(idSet).toBeInstanceOf(Set);
  });

  test('compilerIcon should return null for invalid file', async () => {
    const result = await compilerIcon('', 'test-symbol', {});
    expect(result).toBeNull();
  });

  test('createSymbolId should generate correct symbol ID', () => {
    const name = 'test/icon.svg';
    const symbolId = createSymbolId(name, mockOptions);

    expect(symbolId).toBe('icon-test-icon');
  });
});
