const WebSocket = require("ws");
const path = require('path');
const {
    spawn
} = require('child_process');

const compilationStartedRegex =
    /( Starting compilation in watch mode\.\.\.| File change detected\. Starting incremental compilation\.\.\.)/;
// [10:23:58] Found 132 errors. Watching for file changes.
const compilationCompleteRegex =
    /( Compilation complete\. Watching for file changes\.| Found \d+ error[s]?\. Watching for file changes\.)/;
let compilationCompleted = false // 监听本次编译是否完成
let compilationStart = false

let socket = null,
    cacheMessage = []

// 创建一个 WebSocket 服务器，监听 3000 端口
const server = new WebSocket.Server({
    port: 8888
});
// 监听连接事件
server.on("connection", (s) => { // tsc 不放在回调里，节省编译资源，通过缓存提供给多个客户端同样的 ts error
    console.log("客户端已连接");
    socket = s
    socket.send(JSON.stringify(cacheMessage));
});

// 监听 tsc watch 的错误输出
const tsc = spawn("tsc", ["--project", path.resolve(__dirname, './tsconfig.json'), "--watch"], {
    // stdio: "inherit",
    stdio: 'pipe'
});


// process.stdout.on("data", (data) => {
// })

tsc.stdout.on("data", (data) => {
    const error = data.toString();
    console.log('\x1b[32m[TS ERROR]\x1b[0m', error)
    // process.stdout.write(data)

    if (compilationStartedRegex.test(error)) {
        compilationStart = true
    }

    if (compilationStart) {
        cacheMessage = [] // 开始编译的时候才会清空
        compilationStart = false
    }else{
        cacheMessage.push(error)
    }

    // processErrorLog(error)

    if (compilationCompleteRegex.test(error)) {
        compilationCompleted = true
        // console.log(cacheMessage[0],'-----',cacheMessage[1])
        console.log('this compilation completed', cacheMessage.length)
    } else {
        compilationCompleted = false
    }

    if (socket && socket.readyState === WebSocket.OPEN && compilationCompleted) { // 服务端 socket  存在，并且 客户端没有挂掉
        socket.send(JSON.stringify(cacheMessage));
        // cacheMessage = [] // 可能会有多次连接，这里先不清空
    }
});

tsc.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
});

// 监听子进程的退出事件，并打印退出码
tsc.on("close", (code) => {
    console.error(`tsc process exited with code ${code}`);
});


const processErrorLog = (error) => {
    // 定义一个正则表达式，用于匹配 error 信息的格式
    const regex = /(.+):(\d+):(\d+) - error (TS\d+): (.+)/;

    // 使用正则表达式测试 error 信息是否符合格式
    if (regex.test(error)) {
        // 使用正则表达式捕获 error 信息中的各个部分
        const [, fileName, line, column, errorCode, errorMessage] = regex.exec(
            error
        );

        // 打印各个部分
        console.log("File name:", fileName);
        console.log("Line number:", line);
        console.log("Column number:", column);
        console.log("Error code:", errorCode);
        console.log("Error message:", errorMessage);
    }
}
