import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';

export default function pixelMatchTest() {
  const image1Path = path.resolve(__dirname, '../test/1/original.png');
  const image2Path = path.resolve(__dirname, '../test/1/target.png');

  const img1 = PNG.sync.read(fs.readFileSync(image1Path));
  const img2 = PNG.sync.read(fs.readFileSync(image2Path));
  const { width, height } = img1;

  const diff = new PNG({ width, height });

  const pixelDiffCount = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  fs.writeFileSync('diff.png', PNG.sync.write(diff));

  // 计算相似度
  const totalPixels = img1.width * img1.height;
  const similarity = ((totalPixels - pixelDiffCount) / totalPixels) * 100;

  console.log(`pixelmatch 图片相似度：${similarity.toFixed(2)}%`);
}
