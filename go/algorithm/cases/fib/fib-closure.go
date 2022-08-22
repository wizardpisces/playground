package fib

import "fmt"

func fibonacci() func() int{
	a, b := 0, 1
	return func() int{
		a, b = b, a+b
		return a
	}
}

func closure() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}