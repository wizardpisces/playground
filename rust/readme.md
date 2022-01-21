# Rust

## 简介
一般介绍：拥有精细控制底层的能力，又拥有高度抽象的语言表达能力。
追求安全，实用，并发。（没提到快？）
官方Rust goal: To design and implement a safe, concurrent, practical systems language.

Tradeoff：**编译速度**变慢跟**某些场景的运行速度**变慢？（例如[更安全但是更慢的hashMap](https://prev.rust-lang.org/en-US/faq.html#why-are-rusts-hashmaps-slow)）
## 核心问题
如何做到
- [ ] 更安全？
    - [ ] 解决内存泄漏、缓冲区溢出等问题
- [ ] 更好的并发支持？
- [ ] 对资源更强的控制力？
## 基础
- [ ] 生命周期 20% 
- [ ] 对象所有权
- [ ] 混合范式（OOP和函数式的影子）
- [ ] 类型+行为（trait既可作接口也可做类型限定）  30%
- [ ] 内存管理机制
- [ ] 类型系统
- [ ] 上层抽象范式
- [ ] 协变计算矩阵？

[Rust官方 FAQ](https://prev.rust-lang.org/en-US/faq.html)
## 应用
- [ ] 如嵌入式、Web开发、WebAssembly、区块链
- [ ] 系统驱动、云计算、虚拟存储、网络传输协议、并发编程框架基础库
https://wizardpisces.github.io/blog/basic
## 探索

- [ ] C变异到 rust
- [ ] 内联汇编
- [ ] 交叉编译
- [ ] Parking Lot 并发库
- [ ] SIMD 基础库
- [ ] 代码多态化
- [ ] 热补丁
- [ ] AOP
- [ ] 构建优化
- [ ] 克隆检测
- [ ] 深度学习安全算法识别
- [ ] 文档导航
## examples
How to run
```bash
rustc src/main.rs --out-dir target
./target/main
```

## Questions encountered
>Why do I need to import a trait to use the methods it defines for a type?
* [answer](https://stackoverflow.com/questions/25273816/why-do-i-need-to-import-a-trait-to-use-the-methods-it-defines-for-a-type)

>What is traits
* [answer](https://zhuanlan.zhihu.com/p/127365605)

>What is lifetime
* [如何理解声明周期](https://colobu.com/2019/08/06/lifetimes-in-rust/)

>Rust的编译方案
* [LLVM 的编译方案](https://stackoverflow.com/questions/43385142/how-is-rust-compiled-to-machine-code/43385776)

>目前rust编译比较慢的原因
1. 编译单位是crate全量（xx.rs文件，同时会载入mod依赖） （有计划改成增量编译）
2. 更强大的类型系统，拖慢编译速度（好处：编译阶段就能查出绝大部分错误）
3. 目前生成的 LLVM-IR质量不太高（需要等待LLVM fix），新的方案[MIR](https://github.com/rust-lang/rfcs/blob/master/text/1211-mir.md)可能解决这个问题
4. LLVM对于runtime优化明显，但是对于compile-time没有比较好的优化（代码质量不高也会影响到编译速度）
5. 

# Reference
* https://doc.rust-lang.org/rust-by-example/index.html
* https://www.rust-lang.org/learn/get-started
* https://learning-rust.github.io/docs/c1.ownership.html