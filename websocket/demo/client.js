const logError = console.log
let errorList = []
function createWebSocket() {
    const socket = new WebSocket('ws://localhost:8888');

    socket.onopen = () => {
        logError('已连接到 tsc watch 服务端');
    };

    socket.onmessage = event => {
        const data = JSON.parse(event.data);
        // 打印错误信息
        logError('TS Error Found: ', data);
        errorList = data
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