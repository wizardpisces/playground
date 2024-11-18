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
  const client = await remote(opts);
  const element = await client.$("~counter-button");
  await element.click();
  await element.click();
  await element.click();
  await client.deleteSession();
}

main();
