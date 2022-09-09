package main

import (
	"fmt"
)

var c = make(chan int, 1) // remove buffer 1 and try again
var a string

func f() {
	a = "hello, world"
	c <- 1
	fmt.Println('f')
}

func main() {
	a = "init"
	go f()
	<-c
	fmt.Println(a) // init
}
