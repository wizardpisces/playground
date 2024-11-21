import fs from 'fs';

let getReportGlobal: (currentOS: string) => Promise<void>;
let setTestInfoGlobal: (sessionId: string, testName: string, testStatus: string, error: string) => Promise<void>;

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
    // const sessionId = driver.sessionId;
    // const testName = `${test.title} in ${duration / 1000} s`;
    // const boolTestStatus = passed;
    // console.log('setTestInfo: %s', testName);
    // let testStatus = 'FAILED';
    // if (boolTestStatus) {
    //   testStatus = 'PASSED';
    // }

    // await setTestInfoGlobal(sessionId, testName, testStatus, error);
  },

  after: async function (result:any, capabilities: WebdriverIO.Capabilities, specs: string[]) {
    // await getReportGlobal(capabilities.platformName as string);
  },

  before: async function (capabilities: WebdriverIO.Capabilities , specs: string[]) {
    console.log('before_test', specs)
    getReportGlobal = async function (currentOS: string) {
      const url = 'http://localhost:4723/getReport';
      const response = await fetch(url).catch(rejected => {
        console.log('*********** Failed to make fetch call in after');
        console.log(rejected);
      });
      const data = await response?.text();

      // Create Report File
      const fileName = `Report_${currentOS}_${Math.floor(Date.now() / 1000)}`;
      fs.writeFile(`./${fileName}.html`, data || 'report data is empty', 'utf-8', (err) => {
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
      const reqBody: any = {};
      reqBody.sessionId = sessionId;
      reqBody.error = `${error}`;
      reqBody.testName = testName;
      reqBody.testStatus = testStatus;

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