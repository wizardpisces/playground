## Questions

## 思考
1. 如何让小学生认识个位跟十位数？
2. 如何理解编程自举？（如果候选人熟悉编译原理）
3. 世界重启思想实验
    * 如果让你来设计网络？
        * 有了 IP 地址为什么还需要 MAC 地址？
    * 如果让你来设计操作系统？
    * 如果让你来设计编程语言？
## Vue

1. 列出使用过的vue directive
2. 父子组件 create/mounted执行顺序
3. 插件的install原理

4. 为什么 Vue3 不实现类似 React 的时间切片（Time Slicing）？
    * https://github.com/vuejs/rfcs/issues/89#issuecomment-546988615
    * https://juejin.cn/post/6844904134945030151

5. 简单描述下 SolidJS/React/Vue 的 「编译时」、「运行时」、「响应原理」
    * https://zhuanlan.zhihu.com/p/385841019
## React
1. 如何理解 react Concurrent？主要解决得问题是什么
    * https://segmentfault.com/a/1190000020110045###
    * https://zhuanlan.zhihu.com/p/60307571

2. React Hooks 跟 Vue Hooks的区别（Vue Composition-Api）?
3. 谈一谈 Mixin、HOC、Render props、Hooks
4. 为什么需要scheduler? 任务调度原理是什么？

## 描述下JXS跟Template的优势跟劣势
## 描述下React跟Vue分别的演化方向

### 进阶问题
1. Vue 和 React 的核心差异，以及核心差异对后续设计产生的“不可逆”影响
2. Vue 和 React 在 API 设计风格和哲学理念（甚至作者个人魅力）上的不同
3. Vue 和 React 在工程化预编译构建阶段，AOT 和 JIT 优化的本质差异和设计
## 模式

* 什么是 IOC/DI？解决什么问题
* 如何理解软件开发中 横向/纵向 扩展？

## 网络

* 什么是RPC？有了http为什么还需要 rpc ?

## js基础

1. Map 跟 WeakMap 的区别
2. 什么是正则回溯
    * [回溯原理](https://zhuanlan.zhihu.com/p/27417442)
    * [回溯的灾难](https://zh.javascript.info/regexp-catastrophic-backtracking)


## Typescript

* ts是否有runtime？emitDecoratorMetadata 配置的作用？

## Nodejs

1. node 处理 多个请求跟 java(基于线程的服务语言) 处理多个请求的区别?
2. 如何理解 node同步阻塞，异步非阻塞？

同步阻塞(cpu-bound运算)
异步非阻塞(网络请求/数据库操作等)

```
req1 |-  cpu -|--- request ---|- cpu -|
req2          |- cpu -|--- request ---|- cpu -|
req3                  |- cpu -|---request---| |- cpu -|
```

可以参照 [pzzcn 的回答](https://cnodejs.org/topic/5c8b0a4a7ce0df3732428254)

3. 了解过的内存泄露场景
    * [four-types-of-leak](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)
## 漏洞分析

1. 了解哪些攻击方式？
    * https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
    * XSS
    * CSRF
    * 

## 计算机底层

1. 操作系统是一个进程么？
2. 内核态跟用户态区别？
3. 计算机是如何区分内核态跟用户态的？
4. 编译优化？指令重排？
5. 什么是内存可见性？
6. web
    * webContainer 原理？
    * WASI
    * 什么是Serverless？为什么webContainer可能带来变化？
8. 什么是hypervisor，如何隔绝操作系统对于硬件的感知？可以理解成操作系统的操作系统？
9. 虚拟化？
    * 服务虚拟化 CPU
    * 存储虚拟化
    * 网络虚拟化
    * 应用：IO虚拟化、KVM/QEMU、内存虚拟化、SRIOV、Virtio、vDPA
10. docker
    * UnionFS
    * When running on Linux, Docker uses the resource isolation features of the Linux kernel (such as cgroups and kernel namespaces) and a union-capable file system (such as OverlayFS)[11] to allow containers to run within a single Linux instance, avoiding the overhead of starting and maintaining virtual machines.[12] Docker on macOS uses a Linux virtual machine to run the containers.[13]
11. linux
    * cgroup
    * namespaces
12. 计算机组成：运算器，控制器，存储器，I/O