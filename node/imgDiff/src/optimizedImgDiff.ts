import fs from 'fs';
import { PNG, PNGWithMetadata } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';
import ssim from 'ssim.js';
export default function optimizedImgDiff(img1: PNGWithMetadata, img2: PNGWithMetadata, threshold: number = 0.1) {
  // 开始测量时间
  const startTime = performance.now();

  const { width, height } = img1;

  if (img1.width !== img2.width || img1.height !== img2.height) {
    // 将 PNG 数据包装为 ImageData
    const imageData1 = {
      data: new Uint8ClampedArray(img1.data),  // 将 Uint8Array 转换为 Uint8ClampedArray
      width: img1.width,
      height: img1.height,
    };

    const imageData2 = {
      data: new Uint8ClampedArray(img2.data),
      width: img2.width,
      height: img2.height,
    };

    // 使用 ssim.js 比较
    const similarity = ssim(imageData1, imageData2);
    console.log(`[optimizedImgDiff] ssim.js 耗时：${similarity.performance}ms ; 图片相似度:${(similarity.mssim*100).toFixed(2)}%`); // 输出结构相似性分数
    return similarity.mssim*100;
  }

  const diff = new PNG({ width, height });
  
  /**
   * 计算相似度
   * @param threshold 阈值，0-1，越小越严格
   * threshold 0.05 相似度 94.90%
   * threshold 0.1 相似度 98.01%
   */
  const pixelDiffCount = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

  // 结束测量时间
  const endTime = performance.now();

  // const dir = path.resolve(__dirname, `../test-result/${caseNumber}/${threshold}`);
  // fs.mkdirSync(dir, { recursive: true });
  // fs.writeFileSync(`${dir}/diff.png`, PNG.sync.write(diff));

  // 计算相似度
  const totalPixels = img1.width * img1.height;
  const similarity = ((totalPixels - pixelDiffCount) / totalPixels) * 100;

  console.log(`[optimizedImgDiff] 耗时:${(endTime - startTime).toFixed(2)}ms ; threshold:${threshold} ; 图片相似度：${similarity.toFixed(2)}%`);
  return similarity;
}
