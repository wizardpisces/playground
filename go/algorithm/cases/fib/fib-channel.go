package fib

import (
	"fmt"
)

func fibChannel(n int, c chan int){
	a,b :=0,1
	for i:=0; i<n; i++{
		a,b = b,a+b
		c <- a
	}
	
	close(c)
}

func channel(){
	c := make(chan int,10)
	
	fibChannel(cap(c),c)
	
	for i:=range c{
		fmt.Println(i)
	}

}