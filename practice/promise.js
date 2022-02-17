const p1 = new Promise(resolve => { setTimeout(resolve, 200, 1) });
const p2 = new Promise(resolve => { resolve(2) });
const p3 = 3;

Promise.all([p1, p2, p3]).then(res=>console.log(res))
Promise.race([p1, p2, p3]).then(res=>console.log(res))

Promise.all = (args)=>{
    let _resolve,
        res = []
    let p = new Promise((resolve,reject)=>{
        _resolve = resolve
    })

    let pLen = args.length

    args.forEach((arg,index) => {
        Promise.resolve(arg).then(result=>{
            res[index] = result
            if(index === pLen-1){
                _resolve(res)
            }
        })
    });

    return p
}

Promise.race = (args)=>{
     let _resolve,
        res = []
    let p = new Promise((resolve,reject)=>{
        _resolve = resolve
    })

    let pLen = args.length

    args.forEach((arg,index) => {
        if(arg instanceof Promise){
            arg.then(r=>{
                _resolve(arg)
            })
        }else{
            _resolve(arg)
        }
    });

    return p
}