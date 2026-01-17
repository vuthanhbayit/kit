import { describe, expect, test } from 'vitest'
import { expandNode, toTree, getChildren, forEachTree, expandAllNodes, collapseAllNodes } from '../src'

const array = [
  { id: 1, parentId: null, name: 'Node 1' },
  { id: 2, parentId: 1, name: 'Node 2' },
  { id: 3, parentId: 1, name: 'Node 3' },
  { id: 4, parentId: 2, name: 'Node 4' },
  { id: 5, parentId: 3, name: 'Node 5' },
]

describe('toTree', () => {
  test('should transform a flat array of nodes into a tree structure', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })

    expect(tree).toEqual([
      {
        data: { id: 1, parentId: null, name: 'Node 1' },
        children: [
          {
            data: { id: 2, parentId: 1, name: 'Node 2' },
            children: [
              {
                data: { id: 4, parentId: 2, name: 'Node 4' },
                children: [],
                level: 3,
                isLeaf: true,
                isExpanded: false,
                isSelected: false,
              },
            ],
            level: 2,
            isLeaf: false,
            isExpanded: false,
            isSelected: false,
          },
          {
            data: { id: 3, parentId: 1, name: 'Node 3' },
            children: [
              {
                data: { id: 5, parentId: 3, name: 'Node 5' },
                children: [],
                level: 3,
                isLeaf: true,
                isExpanded: false,
                isSelected: false,
              },
            ],
            level: 2,
            isLeaf: false,
            isExpanded: false,
            isSelected: false,
          },
        ],
        level: 1,
        isLeaf: false,
        isExpanded: false,
        isSelected: false,
      },
    ])
  })
})

describe('expandNode', () => {
  test('should expand the correct node', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })

    const expectedResult = [
      {
        data: { id: 1, parentId: null, name: 'Node 1' },
        children: [
          {
            data: { id: 2, parentId: 1, name: 'Node 2' },
            children: [
              {
                data: { id: 4, parentId: 2, name: 'Node 4' },
                children: [],
                level: 3,
                isLeaf: true,
                isExpanded: true,
                isSelected: false,
              },
            ],
            level: 2,
            isLeaf: false,
            isExpanded: true,
            isSelected: false,
          },
          {
            data: { id: 3, parentId: 1, name: 'Node 3' },
            children: [
              {
                data: { id: 5, parentId: 3, name: 'Node 5' },
                children: [],
                level: 3,
                isLeaf: true,
                isExpanded: false,
                isSelected: false,
              },
            ],
            level: 2,
            isLeaf: false,
            isExpanded: false,
            isSelected: false,
          },
        ],
        level: 1,
        isLeaf: false,
        isExpanded: true,
        isSelected: false,
      },
    ]

    const result = expandNode(tree, 'id', 4)

    expect(result).toEqual(expectedResult)
  })
})

describe('getChildren', () => {
  test('should return children of a node', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    const children = getChildren(tree, 'id', 1)

    expect(children).toHaveLength(2)
    expect(children[0].data.id).toBe(2)
    expect(children[1].data.id).toBe(3)
  })

  test('should return children of nested node', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    const children = getChildren(tree, 'id', 2)

    expect(children).toHaveLength(1)
    expect(children[0].data.id).toBe(4)
  })

  test('should return empty array for leaf node', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    const children = getChildren(tree, 'id', 4)

    expect(children).toHaveLength(0)
  })

  test('should return empty array for non-existent node', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    const children = getChildren(tree, 'id', 999)

    expect(children).toHaveLength(0)
  })
})

describe('forEachTree', () => {
  test('should iterate over all nodes in tree', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    const visitedIds: number[] = []

    forEachTree(tree, node => {
      visitedIds.push(node.data.id)
    })

    expect(visitedIds).toEqual([1, 2, 4, 3, 5])
  })
})

describe('expandAllNodes', () => {
  test('should expand all nodes in tree', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    expandAllNodes(tree)

    const checkExpanded = (nodes: typeof tree) => {
      for (const node of nodes) {
        expect(node.isExpanded).toBe(true)
        checkExpanded(node.children)
      }
    }

    checkExpanded(tree)
  })
})

describe('collapseAllNodes', () => {
  test('should collapse all nodes in tree', () => {
    const tree = toTree(array, { id: 'id', parentId: 'parentId' })
    expandAllNodes(tree)
    collapseAllNodes(tree)

    const checkCollapsed = (nodes: typeof tree) => {
      for (const node of nodes) {
        expect(node.isExpanded).toBe(false)
        checkCollapsed(node.children)
      }
    }

    checkCollapsed(tree)
  })
})
