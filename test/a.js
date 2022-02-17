// fibonacci fiber
function fib(n) {
  let fiber = { arg: n, returnAddr: null, a: 0 }, consoled = false;
  // 标记循环
  rec: while (true) {
    // 当展开完全后，开始计算
    if (fiber.arg <= 2) {
      let sum = 1;
      // 寻找父级
      while (fiber.returnAddr) {
        if(!consoled) {
          // 在这里打印查看形成的链表形式的 fiber 对象
          consoled=true
          console.log(fiber)
        }
        fiber = fiber.returnAddr;
        if (fiber.a === 0) {
          fiber.a = sum;
          fiber = { arg: fiber.arg - 2, returnAddr: fiber, a: 0 };
          continue rec;
        }
        sum += fiber.a;
      }
      return sum;
    } else {
      // 先展开
      fiber = { arg: fiber.arg - 1, returnAddr: fiber, a: 0 };
    }
  }
}

console.log(fib(6))