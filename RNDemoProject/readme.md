## Introduction

RN demo project

## How to run

```bash
nvm use 20
yarn
npm run start

# 启动appium服务 appium --port 4723 --allow-cors --use-plugins=appium-reporter-plugin
npm run e2e:demo # 通过 appium 直接运行测试

# 通过 wdio 运行测试
npm run e2e
```
