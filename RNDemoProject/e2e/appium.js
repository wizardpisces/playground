const wdio = require("webdriverio");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'iOS',               // 平台名称
    platformVersion: '16.4',           // 模拟器的 iOS 版本
    deviceName: 'iPhone 14 Pro',           // 模拟器的设备名称
    automationName: 'XCUITest',        // 使用 XCUITest 自动化驱动
    bundleId: 'host.exp.exponent',    // Expo Go 客户端的 Bundle Identifier
    noReset: true                      // 保留应用状态
  }
};
async function main() {

  const client = await wdio.remote(opts);

  // 示例操作
  const element = await client.$("~AccessibilityId");
  await element.click();
  await client.deleteSession();
}

// 调用 async 函数
main().catch(err => console.error(err));
