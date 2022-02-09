# Rust

## 简介
一般介绍：拥有精细控制底层的能力，又拥有高度抽象的语言表达能力。
Rust is a systems programming language focused on three goals: safety, speed, and concurrency.

## 应用
### 前端应用
Rust 开始替换 Javascript 的 Web 生态系统的重要组成部分包括压缩（Terser）、编译（Babel）、格式化（Prettier）、打包（webpack）、代码检查（ESLint）、以及更多其他的库

0. [swc](https://swc.rs/docs/getting-started)
1. [Rome](https://github.com/rome/tools)
2. [Tauri](https://github.com/tauri-apps/tauri)
3. [Deno](https://github.com/denoland/deno)

### 领域应用
- [ ] 如嵌入式、Web开发、WebAssembly、区块链
- [ ] 系统驱动、云计算、虚拟存储、网络传输协议、并发编程框架基础库
https://wizardpisces.github.io/blog/basic

### 其他探索

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

## 关于语言
- [ ] 更安全？（通过所有权跟类型安全 编译时发现问题）
    - [ ] 解决内存泄漏、缓冲区溢出等问题
- [ ] 更好的并发支持？（通过所有权跟类型安全 编译时发现问题）
- [ ] 对资源更强的控制力？
### 基础
- [ ] [Lifetime](https://learning-rust.github.io/docs/c3.lifetimes.html#What-is-Lifetime) 20% 
- [ ] ownership（rust memory safe的原因）/borrowing  60%
- [ ] 混合范式（OOP和函数式的影子）
- [ ] 类型+行为（trait既可作接口也可做类型限定）  30%
- [ ] 内存管理机制
- [ ] 并发机制
- [ ] 类型系统
- [ ] 上层抽象范式
- [ ] 协变计算矩阵？
- [ ] rust web server
### examples
How to run
```bash
rustc src/main.rs --out-dir target
./target/main
```

## Q&A
>Why do I need to import a trait to use the methods it defines for a type?
* [answer](https://stackoverflow.com/questions/25273816/why-do-i-need-to-import-a-trait-to-use-the-methods-it-defines-for-a-type)

>What is traits
* [answer](https://zhuanlan.zhihu.com/p/127365605)

>What is lifetime
* [如何理解lifetime](https://colobu.com/2019/08/06/lifetimes-in-rust/)

>Rust的编译方案
* [LLVM 的编译方案](https://stackoverflow.com/questions/43385142/how-is-rust-compiled-to-machine-code/43385776)

>目前rust编译比较慢的原因
1. 编译单位是crate全量（xx.rs文件，同时会载入mod依赖） （有计划改成增量编译）
2. 更强大的类型系统，拖慢编译速度（好处：编译阶段就能查出绝大部分错误）
3. 目前生成的 LLVM-IR质量不太高（需要等待LLVM fix），新的方案[MIR](https://github.com/rust-lang/rfcs/blob/master/text/1211-mir.md)可能解决这个问题
4. LLVM对于runtime优化明显，但是对于compile-time没有比较好的优化（代码质量不高也会影响到编译速度）

>rust泛型(generics)的单态化(monomorphization)，会不会使编译出来的结果变大？会
1. https://www.zhihu.com/question/353091922
2. https://doc.rust-lang.org/1.8.0/book/trait-objects.html
3. 查看 src/polymorphism.rs 例子的 staic_dispatch
4.

>Tradeoff
1. **编译速度**变慢跟**某些场景的运行速度**变慢？（例如[更安全但是更慢的hashMap](https://prev.rust-lang.org/en-US/faq.html#why-are-rusts-hashmaps-slow)）
# Reference

* [Rust官方 FAQ](https://prev.rust-lang.org/en-US/faq.html)
* [rust可以做什么更详细的介绍](https://www.infoq.cn/article/umqbighceoa81yij7uyg)
* （书籍）[Rust程序设计](https://kaisery.github.io/trpl-zh-cn/foreword.html)
* https://doc.rust-lang.org/rust-by-example/index.html
* https://www.rust-lang.org/learn/get-started
* https://learning-rust.github.io/docs/c1.ownership.html