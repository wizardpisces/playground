// 求不重复集合的全排列，e.g. [1,2] => [],[1],[2],[1,2],[2,1]

function subset(list){
    let result = [],path = []
    function dfs(){ 
        result.push(path.concat())
        list.forEach(item => {
            if(path.includes(item)){
                return
            }
            path.push(item)
            dfs()
            path.pop()
        });
    }
    dfs()
    return result
}

console.log(subset(([1,2])))