import fs from 'fs';

let getReportGlobal: (currentOS: string) => Promise<void>;
let setTestInfoGlobal: (sessionId: string, testName: string, testStatus: string, error: string) => Promise<void>;

function getCurrentFormattedTime() {
  const now = new Date(); // 获取当前时间

  const year = now.getFullYear(); // 获取年份
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 获取月份（0-11），加1并补零
  const date = String(now.getDate()).padStart(2, '0'); // 获取日期并补零

  const hours = String(now.getHours()).padStart(2, '0'); // 获取小时并补零
  const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟并补零
  const seconds = String(now.getSeconds()).padStart(2, '0'); // 获取秒数并补零

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`; // 拼接字符串
}


export const config: WebdriverIO.Config = {
  // path: '/', // Appium v2 服务路径
  port: 4723,
  capabilities: [{
    platformName: 'iOS',               // iOS 平台
    'appium:platformVersion': '16.4',           // iOS 模拟器版本，确保与你的模拟器匹配
    'appium:deviceName': 'iPhone 14 Pro',       // 模拟器名称，确保与运行的模拟器一致
    'appium:automationName': 'XCUITest',        // Appium 驱动
    'appium:bundleId': 'host.exp.Exponent',     // Expo Go 的 Bundle ID
    'appium:noReset': true                      // 保留应用状态，避免重复安装
  }],
  runner: 'local',
  specs: ['./specs/*.spec.ts'],
  // logLevel: 'debug',
  logLevel: 'info',
  bail: 0,
  // baseUrl: 'http://localhost:8080',
  baseUrl: '',
  waitforTimeout: 45000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    // timeout: 3 * 60 * 1000, // 3min
    timeout: 10000,
  },
  services: [[
    'appium',
    {
      command: 'appium',
      args: {
        // relaxedSecurity: true,
        // port: 4723,
        // allowCors: true, // 便于通过 web 录制事件
        address: '127.0.0.1',
        usePlugins: 'appium-reporter-plugin',
        log: './appium.log',
      },
    },
  ]],
  afterTest: async function (
    test: any, context: any, { error, result, duration, passed, retries }: any
  ) {
    const sessionId = driver.sessionId;
    const testName = `${test.title} in ${duration / 1000} s`;
    const boolTestStatus = passed;
    console.log('setTestInfo: %s', testName);
    let testStatus = 'FAILED';
    if (boolTestStatus) {
      testStatus = 'PASSED';
    }

    await setTestInfoGlobal(sessionId, testName, testStatus, error);
  },

  after: async function (result:any, capabilities: WebdriverIO.Capabilities, specs: string[]) {
    console.log('after result', result)
    await getReportGlobal(capabilities.platformName as string);
  },

  before: async function (capabilities: WebdriverIO.Capabilities , specs: string[]) {
    getReportGlobal = async function (currentOS: string) {
      const url = 'http://localhost:4723/getReport';
      const response = await fetch(url).catch(rejected => {
        console.log('*********** Failed to make fetch call in after');
        console.log(rejected);
      });
      const data = await response?.text();

      // Create Report File
      const fileName = `report_${currentOS}_${getCurrentFormattedTime()}`;
      fs.writeFile(`${__dirname}/reports/${fileName}.html`, data || 'report data is empty', 'utf-8', (err) => {
        if (err) throw err;
      });

      // delete report data from plugin
      const urlD = 'http://127.0.0.1:4723/deleteReportData';
      await fetch(urlD, { method: 'DELETE' }).catch(rejected => {
        console.log('*********** Failed to delete report data');
        console.log(rejected);
      });
    };

    // api call to setTestinfo binding is made with params
    
    setTestInfoGlobal = async function (sessionId: string, testName: string, testStatus: string, error: string) {
      const url = 'http://localhost:4723/setTestInfo';
      const reqBody: {
        sessionId: string,
        error: string,
        testName: string,
        testStatus: string,
      } = {
        sessionId: sessionId,
        error: `${error}`,
        testName: testName,
        testStatus: testStatus,
      };

      await fetch(url, {
        method: 'post',
        body: JSON.stringify(reqBody),
        headers: { 'Content-Type': 'application/json' }
      }).catch(rejected => {
        console.log('*********** Failed to make fetch call');
        console.log(rejected);
      });
    };
  },

};