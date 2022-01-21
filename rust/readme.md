# Rust

拥有精细控制底层的能力，又拥有高度抽象的语言表达能力。
追求安全，实用，并发。

学习步骤：
## 基础
- [ 50%] 生命周期
- [ ] 对象所有权
- [ ] 混合范式（OOP和函数式的影子）
- [ ] 类型+行为（trait既可作接口也可做类型限定）
- [ ] 内存管理机制
- [ ] 类型系统
- [ ] 上层抽象范式
- [ ] 协变计算矩阵？

## 应用
- [ ] 如嵌入式、Web开发、WebAssembly、区块链
## examples
How to run
```bash
rustc src/main.rs --out-dir target
./target/main
```

## Questions encountered
* Why do I need to import a trait to use the methods it defines for a type?
[answer](https://stackoverflow.com/questions/25273816/why-do-i-need-to-import-a-trait-to-use-the-methods-it-defines-for-a-type)
* What is traits
[answer](https://zhuanlan.zhihu.com/p/127365605)
* What is lifetime
[如何理解声明周期](https://colobu.com/2019/08/06/lifetimes-in-rust/)
# Reference
* https://doc.rust-lang.org/rust-by-example/index.html
* https://www.rust-lang.org/learn/get-started
* https://learning-rust.github.io/docs/c1.ownership.html