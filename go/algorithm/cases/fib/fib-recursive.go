package fib

func recursive(num int) int{
	if num<2{
		return 1
	}
	
	return recursive(num-1) + recursive(num-2)
}
