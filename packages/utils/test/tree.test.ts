import { describe, expect, test } from 'vitest'
import { expandNode, toTree } from '../src'

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
