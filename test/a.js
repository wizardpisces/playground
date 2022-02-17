// fibonacci fiber
function fib(n) {
  let fiber = { index: n, returnAddr: null, value: 0 }, consoled = false;
  // 标记循环
  rec: while (true) {
    // 当展开完全后，开始计算
    if (fiber.index <= 2) {
      let sum = 1;
      // 寻找父级
      while (fiber.returnAddr) {
        if(!consoled) {
          // 在这里打印查看形成的链表形式的 fiber 对象
          consoled=true
          console.log(fiber)
        }
        fiber = fiber.returnAddr;
        if (fiber.value === 0) {
          fiber.value = sum;
          fiber = { index: fiber.index - 2, returnAddr: fiber, value: 0 };
          continue rec;
        }
        sum += fiber.value;
      }
      return sum;
    } else {
      // 先展开
      fiber = { index: fiber.index - 1, returnAddr: fiber, value: 0 };
    }
  }
}

console.log(fib(6))