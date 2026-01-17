interface TreeNode {
  [key: string]: any
}

interface Tree<T> {
  data: T
  children: Tree<T>[]
  level: number
  isLeaf: boolean
  isExpanded: boolean
  isSelected: boolean
}

/**
 * Transforms a flat array of nodes into a tree structure.
 *
 * @template T - The type of the node data.
 * @template K - The type of the node id and parentId properties.
 * @param array - The flat array of nodes.
 * @param {id: K; parentId: K} - The name of the id and parentId property in the node data.
 * @returns An array of root nodes of the tree.
 *
 * This function takes in a flat array of nodes and converts it into a tree structure. It uses a lookup table to store the nodes
 * and their children. It also calculates the level, path, isLeaf, isExpanded, isSelected properties for each node.
 * level: the level of a node in the tree, starts from 1 for the root nodes
 * path: the path of a node in the tree, represented by an array of ids.
 * isLeaf: whether a node has children or not
 * isExpanded: whether a node is expanded or not
 * isSelected: whether a node is selected or not
 *
 */
export const toTree = <T extends TreeNode, K extends keyof T>(
  array: T[],
  { id, parentId }: { id: K; parentId: K },
): Tree<T>[] => {
  const tree: Tree<T>[] = []
  const lookup: { [key: string]: Tree<T> } = {}

  // Create a lookup table for the nodes and their children
  for (const item of array) {
    const _id = item[id]

    lookup[_id] = {
      data: item,
      children: [],
      level: 0,
      isLeaf: false,
      isExpanded: false,
      isSelected: false,
    }
  }

  // Populate the tree using the parentId property
  for (const item of array) {
    const _parentId = item[parentId]
    const _id = item[id]
    const _node = lookup[_id]

    if (_parentId === null) {
      // If parentId is null, this is a root node
      lookup[_id].level = 1 // level of root node is 1

      tree.push(_node)
    } else {
      // If parentId is not null, find the parent node in the lookup table
      const parentNode = lookup[_parentId]

      if (parentNode) {
        lookup[_id].level = parentNode.level + 1

        parentNode.children.push(_node)
      }
    }
  }

  for (const item of array) {
    const _id = item[id]

    lookup[_id].isLeaf = lookup[_id].children.length === 0
  }

  return tree
}

/**
 Returns an array of children for a given node in a tree.
 @template T - The type of the node data.
 @param tree - The array of root nodes of the tree.
 @param nodeId - The name of the id property in the node data.
 @param id - The id of the node for which to get the children.
 @returns An array of children for the given node.
 */
export const getChildren = <T extends TreeNode, K extends keyof T>(tree: Tree<T>[], nodeId: K, id: any): Tree<T>[] => {
  let children: Tree<T>[] = []

  const findNode = (node: Tree<T>) => {
    if (node.data[nodeId] === id) {
      children = node.children
    } else {
      for (const element of node.children) {
        findNode(element)
      }
    }
  }

  for (const element of tree) {
    findNode(element)
  }

  return children
}

/**
 * Applies a callback function to each node in a tree recursively.
 * @template T - The type of the node data.
 * @param tree - The array of root nodes of the tree.
 * @param callback - The callback function to apply to each node.
 */
export const forEachTree = <T extends TreeNode>(tree: Tree<T>[], callback: (node: Tree<T>) => void) => {
  const traverse = (node: Tree<T>) => {
    callback(node)
    for (const child of node.children) {
      traverse(child)
    }
  }

  for (const node of tree) {
    traverse(node)
  }
}

/**
 * Expands all nodes in a tree.
 * @template T - The type of the node data.
 * @param tree - The array of root nodes of the tree.
 */
export const expandAllNodes = <T extends TreeNode>(tree: Tree<T>[]) => {
  forEachTree(tree, node => {
    node.isExpanded = true
  })
}

/**
 * Collapses all nodes in a tree.
 * @template T - The type of the node data.
 * @param tree - The array of root nodes of the tree.
 */
export const collapseAllNodes = <T extends TreeNode>(tree: Tree<T>[]) => {
  forEachTree(tree, node => {
    node.isExpanded = false
  })
}

/**
 * Function to expand a tree node.
 * @template T
 * @template K keyof T
 * @param {Tree<T>[]} tree - The tree to be modified.
 * @param {K} nodeId - The node ID property name.
 * @param {any} id - The node ID to be expanded.
 * @returns {Tree<T>[]} The modified tree.
 */
export const expandNode = <T extends TreeNode, K extends keyof T>(tree: Tree<T>[], nodeId: K, id: any): Tree<T>[] => {
  /**
   * Helper function to traverse the tree and find the node to be expanded.
   * @param {TreeNode} node - The node to be checked.
   * @returns {boolean} Whether the node has been found and expanded.
   */
  const traverse = (node: Tree<T>) => {
    if (node.data[nodeId] === id) {
      node.isExpanded = true
      return true
    }

    if (node.children) {
      for (const child of node.children) {
        if (traverse(child)) {
          node.isExpanded = true
          return true
        }
      }
    }

    return false
  }

  // traverse each node in the tree and expand the desired node
  for (const node of tree) {
    traverse(node)
  }

  return tree
}
