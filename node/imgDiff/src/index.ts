import ssimTest from './ssimTest';
import pixelMatchTest from './pixelMatchTest';

ssimTest(1);
ssimTest(2);

pixelMatchTest(1, 0.05);
pixelMatchTest(2, 0.05);
pixelMatchTest(1, 0.1);
pixelMatchTest(2, 0.1);
