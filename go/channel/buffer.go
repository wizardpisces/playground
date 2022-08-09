package main

import "fmt"

var c = make(chan int,1) // remove buffer 1 and try again
var a string

func f() {
    a = "hello, world"
    x := <- c
    fmt.Println(x)
}

func main() {
	a = "init"
    go f()
    c <- 0
    print(a) // init
}