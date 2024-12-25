import ssim from 'ssim.js';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
export default function ssimTest(caseNumber: number) {
  // 读取 PNG 图像文件并解析为 ImageData
  const image1Path = path.resolve(__dirname, `../test/${caseNumber}/record.png`);
  const image2Path = path.resolve(__dirname, `../test/${caseNumber}/replay.png`);

  const image1Buffer = fs.readFileSync(image1Path);
  const image2Buffer = fs.readFileSync(image2Path);

  const image1 = PNG.sync.read(image1Buffer);
  const image2 = PNG.sync.read(image2Buffer);

  // 将 Uint8Array 转换为 Uint8ClampedArray
  const toUint8ClampedArray = (uint8Array: Uint8Array) => new Uint8ClampedArray(uint8Array);

  // 将 PNG 数据包装为 ImageData
  const imageData1 = {
    data: toUint8ClampedArray(image1.data),
    width: image1.width,
    height: image1.height,
  };

  const imageData2 = {
    data: toUint8ClampedArray(image2.data),
    width: image2.width,
    height: image2.height,
  };

  // 使用 ssim.js 比较
  const similarity = ssim(imageData1, imageData2);
  console.log(`ssim.js case${caseNumber} 耗时：${similarity.performance}ms ; 图片相似度:${similarity.mssim.toFixed(2)}`); // 输出结构相似性分数
}
