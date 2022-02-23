// https://leetcode-cn.com/problems/path-sum/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// 输出：true


// 解法1

var hasPathSum = function (root, targetSum) {
  // 深度优先遍历
  if (root === null) {
    //1.刚开始遍历时
    //2.递归中间 说明该节点不是叶子节点
    return false;
  }
  if (root.left === null && root.right === null) {
    return root.val - targetSum === 0;
  }
  // 拆分成两个子树
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};