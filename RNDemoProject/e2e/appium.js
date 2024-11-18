const { remote } = require("webdriverio");

const opts = {
  // path: '/wd/hub', // Appium v1 服务路径
  path: '/', // Appium v2 服务路径
  port: 4723,
  capabilities: {
    platformName: 'iOS',               // iOS 平台
    'appium:platformVersion': '16.4',           // iOS 模拟器版本，确保与你的模拟器匹配
    'appium:deviceName': 'iPhone 14 Pro',       // 模拟器名称，确保与运行的模拟器一致
    'appium:automationName': 'XCUITest',        // Appium 驱动
    'appium:bundleId': 'host.exp.Exponent',     // Expo Go 的 Bundle ID
    'appium:noReset': true                      // 保留应用状态，避免重复安装
  }
};

async function main() {
  const driver = await remote(opts);
  const element = await driver.$("~counter-button");
  await element.click();
  await element.click();
  await element.click();

  await driver.action('pointer')
    .move({ duration: 0, x: 198, y: 343 })
    .down({ button: 0 })
    .pause(50)
    .up({ button: 0 })
    .perform();

  const el1 = await driver.$("accessibility id:counter-button");
  await el1.click();
  await el1.click();
  const el2 = await driver.$("accessibility id:Click");
  await el2.click();
  await driver.action('pointer')
    .move({ duration: 0, x: 237, y: 239 })
    .down({ button: 0 })
    .pause(50)
    .up({ button: 0 })
    .perform();

  const el3 = await driver.$("accessibility id:Tab Two, tab, 2 of 2");
  await el3.click();
  const el4 = await driver.$("accessibility id:Tab One, tab, 1 of 2");
  await el4.click();

  await driver.action('pointer')
    .move({ duration: 0, x: 370, y: 78 })
    .down({ button: 0 })
    .pause(50)
    .up({ button: 0 })
    .perform();

  await driver.action('pointer')
    .move({ duration: 0, x: 195, y: 88 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 202, y: 736 })
    .up({ button: 0 })
    .perform();


  await driver.deleteSession();
}

main();
