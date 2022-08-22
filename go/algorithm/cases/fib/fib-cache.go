package fib

var fibs [40]uint64

func fibCache(n int) (res uint64) {
	if fibs[n] !=0{
		res = fibs[n]
		return 
	}
	
	if(n<=1){
		res = 1
	}else{
		res = fibCache(n-1)+fibCache(n-2)
	}
	
	fibs[n] = res
	return 
}