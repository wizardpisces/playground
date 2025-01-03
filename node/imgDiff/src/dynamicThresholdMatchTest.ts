import { PNGWithMetadata } from 'pngjs';
import pixelmatch from 'pixelmatch';
import path from 'path';
import fs from 'fs';
import {PNG} from 'pngjs';

function tryToMatchImage(
  baseImg: PNGWithMetadata,
  currentImg: PNGWithMetadata,
  percent: number
): number {
  const { width, height } = baseImg;
  const step = 1;
  const currentPercent = Math.max(percent - step, 0);
  const numDiffPixels = pixelmatch(
    baseImg.data,
    currentImg.data,
    null,
    width,
    height,
    {
      threshold: (100 - currentPercent) / 100
    }
  );
  const isSimilar = numDiffPixels / (width * height) < 0.02;
  return isSimilar
    ? currentPercent
    : tryToMatchImage(baseImg, currentImg, currentPercent);
}

export default function dynamicThresholdMatchTest(img1: PNGWithMetadata, img2: PNGWithMetadata, percent: number = 100) {
  const { width, height } = img1;

  const diff = new PNG({ width, height });
  // 开始测量时间
  const startTime = performance.now();

  const similarity = tryToMatchImage(img1, img2, percent);

  // 结束测量时间
  const endTime = performance.now();

  console.log(`dynamicThresholdMatchTest 耗时:${(endTime - startTime).toFixed(2)}ms ; 图片相似度：${similarity.toFixed(2)}%`);
}
