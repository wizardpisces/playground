package main

import (
	"fmt"
	"sync"
)

var a string

func f(wg *sync.WaitGroup) {
	defer wg.Done()
	a = "hello, world"
	fmt.Println('f')
}

func main() {
	var wg sync.WaitGroup
	a = "init"
	wg.Add(1)

	go f(&wg)
	wg.Wait() // 尝试把本行换到 Println 下面，再次运行
	fmt.Println(a)
}
