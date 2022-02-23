const tree = {
  name: "root",
  children: [
    { name: "叶子1-1" },
    { name: "叶子1-2" },
    {
      name: "叶子2-1",
      children: [
        {
          name: "叶子3-1",
          children: [
            {
              name: "叶子4-1",
            },
          ],
        },
      ],
    },
  ],
};

function getDepth(tree) {
  let max = (depth = 0);
  function traverse(children) {
    depth++;
    if (depth > max) {
      max = depth;
    }
    for (let i = 0, len = children.length; i < len; i++) {
      if (children[i].children) {
        traverse(children[i].children);
        depth--;
      }
    }
  }
  if (tree.children) {
    traverse(tree.children);
  }

  return max;
}

console.log(getDepth(tree));
