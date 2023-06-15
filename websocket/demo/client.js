const logError = console.log
let errorList = []

// 返回 innerHTML
function replaceString(input) {
    // 定义一个正则表达式来匹配 [36mxxx[0m，[33mxxx[0m，[31mxxx[0m 这样的模式
    const regex = /\[(\d+)m(.*?)\[0m/g;
    // 定义一个对象来映射数字和标签的对应关系
    const color = {
        "36": "cyan",
        "33": "yellow",
        "31": "red"
    };
    // 用 replace 方法来替换匹配到的模式，根据数字选择相应的标签
    const result = input.replace(regex, (match, num, text, other) => {
        // 如果数字在对象中存在，就返回对应的标签，否则返回原始匹配
        if (num in color) {
            return `<span style="color:${color[num]}">${text}</span>`;
        } else {
            return match;
        }
    });
    // 返回结果字符串
    return result;
}

// 返回节点
function parseToNodes(input) {
    // 定义一个正则表达式来匹配 [36mxxx[0m，[33mxxx[0m，[31mxxx[0m 这样的模式
    const regex = /\[(\d+)m(.*?)\[0m/g;
    let elements = []
    // 定义一个对象来映射数字和标签的对应关系
    const color = {
        "36": "cyan",
        "33": "yellow",
        "31": "red"
    };
    let parts = input.split(regex);
    console.log('parts', parts)
    // 遍历数组中的每个元素
    for (let i = 0; i < parts.length; i++) {
        // 如果是偶数索引，说明是普通文本，直接添加到节点数组中
        if (i % 3 === 0) {
            elements.push(parts[i]);
        } else {
            // 将下一个元素（内容）作为节点添加到数组中，并传递 style 属性
            elements.push(`<span style="color:${color[parts[i]]}">${parts[++i]}</span>`);

        }
    }
    // 返回结果字符串
    return elements.join('');
}

function createWebSocket() {
    const socket = new WebSocket('ws://localhost:8888');

    socket.onopen = () => {
        logError('已连接到 tsc watch 服务端');
    };

    socket.onmessage = event => {
        errorList = []
        let data = JSON.parse(event.data);
        // 打印错误信息
        logError('TS Error Found: ', data);
        // data.forEach(errStr => {
        //     errorList = errorList.concat(processString(errStr).filter((item) => item))
        // });
        // logError('error processed',errorList)

        data = data.map(str => parseToNodes(str))
        document.body.innerHTML = data.join('<br>')

        // data = data.map(str => replaceString(str))
        // document.body.innerHTML = data.join('<br>')
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