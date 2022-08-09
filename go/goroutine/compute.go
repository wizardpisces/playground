package main

import (
	"fmt"
	"runtime"
)

func main() {
    var x int
    threads := runtime.GOMAXPROCS(0)
    ch := make(chan int,threads)
    for i := 0; i < threads; i++ {
        go func() {
            // v := <-ch
            // v++
            // for { v++;ch<-v }
            x++
            ch <- x
            fmt.Println("x =", x,threads) // x = 0
        }()
    }
    // time.Sleep(time.Second)
    // fmt.Println("x =", <-ch) // x = 0
    for i := 0; i < threads; i++ {
        fmt.Println("x =", <-ch) // x = 0
    }

}

// 编译优化，指令重排：https://zhuanlan.zhihu.com/p/69414216#:~:text=%E5%86%85%E5%AD%98%E9%87%8D%E6%8E%92%E6%98%AF%E6%8C%87,%E6%A0%87%E5%87%86%E5%BA%93%E9%87%8C%E7%9A%84%E9%94%81%E3%80%82

// 内存可见性（go happens before） https://juejin.cn/post/6911126210340716558