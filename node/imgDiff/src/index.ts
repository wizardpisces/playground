import ssimTest from './ssimTest';
import pixelMatchTest from './optimizedImgDiff';
import dynamicThresholdMatchTest from './dynamicThresholdMatchTest';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
// 用例数量
[1, 2, 3].forEach((caseNumber) => {

  console.log(`\ncase${caseNumber}:`);

  const image1Path = path.resolve(__dirname, `../test/${caseNumber}/record.png`);
  const image2Path = path.resolve(__dirname, `../test/${caseNumber}/replay.png`);

  const img1 = PNG.sync.read(fs.readFileSync(image1Path));
  const img2 = PNG.sync.read(fs.readFileSync(image2Path));

  // ssimTest(caseNumber);
  dynamicThresholdMatchTest(img1, img2, 100);
  // 切换不同的阈值 [0.05, 0.1, 0.15]
  [0.1].forEach((threshold, index) => {
    pixelMatchTest(img1, img2, threshold);
  });
});
