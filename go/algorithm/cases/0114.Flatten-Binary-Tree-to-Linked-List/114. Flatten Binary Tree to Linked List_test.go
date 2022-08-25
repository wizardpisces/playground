package leetcode

import (
	"fmt"
	"reflect"
	"testing"

	"algorithm/structures"
)

type question114 struct {
	para114
	ans114
}

// para 是参数
// one 代表第一个参数
type para114 struct {
	one []int
}

// ans 是答案
// one 代表第一个答案
type ans114 struct {
	one []int
}

func Test_Problem114(t *testing.T) {

	qs := []question114{

		{
			para114{[]int{1, 2, 3, 4, 5, 6}},
			ans114{[]int{1, 2, 3, 4, 5, 6}},
		},
	}

	fmt.Printf("------------------------Leetcode Problem 114------------------------\n")

	for i, q := range qs {
		_, p := q.ans114, q.para114
		fmt.Printf("【input】:%v       \n", p)
		rootOne := structures.Ints2TreeNode(p.one)
		inputSlice := structures.Tree2Preorder(rootOne)
		flatten(rootOne)
		result := structures.Tree2Preorder(rootOne)
		// fmt.Printf("【output】:%v      \n", structures.Tree2Preorder(rootOne))
		if !reflect.DeepEqual(inputSlice, result) {
			t.Fatalf("case-%d: expect = %v, got = %v", i, inputSlice, result)
		}
	}
	fmt.Printf("\n\n\n")
}
