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

// 创建一个 WebSocket 服务器，监听端口
const server = new WebSocket.Server({
    port: 9999
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

// 假设输入字符串是 input
function processString(input) {
    // 定义一个正则表达式来匹配每一行的四个部分
    const regex = /(.+)\((\d+,\d+)\): error (\w+): (.+)/;
    // 用换行符来分割字符串，得到一个数组
    const lines = input.split("\n");
    // 用 map 方法来遍历数组，对每一行进行处理，返回一个对象
    const result = lines.map(line => {
        // 用正则表达式来提取四个部分
        const match = line.match(regex);
        // 如果匹配成功，返回一个对象，否则返回 null
        if (match) {
            let errorObj = {
                pathName: match[1],
                position: match[2],
                code: match[3],
                msg: match[4]
            };
            return `\n\x1b[36m${errorObj.pathName}\x1b[0m\x1b[33m:${errorObj.position}\x1b[0m - \x1b[31merror ${errorObj.code}\x1b[0m: ${errorObj.msg}`
        } else {
            return line;
        }
    });
    // 返回结果数组
    return result.join('\n');
}
// process.stdout.on("data", (data) => {
// })

tsc.stdout.on("data", (data) => {
    const rawError = data.toString();
    let error = processString(rawError)
    // console.log('\x1b[32m[TS ERROR]\x1b[0m', error)
    console.log(error)
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

function cleanExit() {
    // send signal to child process
    tsc.kill('SIGINT');
    // exit main process
    process.exit();
}

// listen for signals and exit events
// process.on('SIGINT', cleanExit);
// process.on('SIGTERM', cleanExit);
// process.on('exit', cleanExit);

// WebSocket.prototype.on('close', () => {
//     console.log('closing')
//     server.close()
// })