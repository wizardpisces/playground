const logError = console.log
let errorList = []

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
            return {
                pathName: match[1],
                position: match[2],
                code: match[3],
                ErrorMessage: match[4]
            };
        } else {
            return null;
        }
    });
    // 返回结果数组
    return result;
}

function createWebSocket() {
    const socket = new WebSocket('ws://localhost:8888');

    socket.onopen = () => {
        logError('已连接到 tsc watch 服务端');
    };

    socket.onmessage = event => {
        errorList = []
        const data = JSON.parse(event.data);
        // 打印错误信息
        logError('TS Error Found: ', data);
        data.forEach(errStr => {
            errorList = errorList.concat(processString(errStr).filter((item) => item))
        });
        logError('error processed',errorList)
    };

    // 监听关闭事件
    socket.onclose = event => {
        // 打印关闭信息
        logError(event.code, event.reason);

        // 等待一秒后重新连接
        logError('尝试重连 tsc watch 服务端');
        setTimeout(createWebSocket, 2000);
    };
}
createWebSocket();