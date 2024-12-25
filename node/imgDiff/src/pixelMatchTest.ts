import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';

export default function pixelMatchTest(caseNumber: number, threshold: number = 0.1) {
  const image1Path = path.resolve(__dirname, `../test/${caseNumber}/record.png`);
  const image2Path = path.resolve(__dirname, `../test/${caseNumber}/replay.png`);

  const img1 = PNG.sync.read(fs.readFileSync(image1Path));
  const img2 = PNG.sync.read(fs.readFileSync(image2Path));
  const { width, height } = img1;

  const diff = new PNG({ width, height });
  // 开始测量时间
  const startTime = performance.now();
  /**
   * 计算相似度
   * @param threshold 阈值，0-1，越小越严格
   * threshold 0.05 相似度 94.90%
   * threshold 0.1 相似度 98.01%
   */
  const pixelDiffCount = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

  // 结束测量时间
  const endTime = performance.now();

  fs.writeFileSync(`${caseNumber}-${threshold}-diff.png`, PNG.sync.write(diff));

  // 计算相似度
  const totalPixels = img1.width * img1.height;
  const similarity = ((totalPixels - pixelDiffCount) / totalPixels) * 100;

  console.log(`pixelmatch case${caseNumber} 耗时:${(endTime - startTime).toFixed(2)}ms ; threshold:${threshold} ; 图片相似度：${similarity.toFixed(2)}%`);
}
