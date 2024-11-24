import { expect, test } from 'vitest'
import { scoreItemDescription } from '../src/utils/scoreItemDescription.js'
import type { Item } from '../src/models/item.js'

test('item should have no score', () => {
    const items: Item[] = [{ shortDescription: 'item', price: '2.34' }]

    expect(scoreItemDescription(items)).toBe(0)
})

test('item should have score', () => {
    const items: Item[] = [{ shortDescription: 'item 1', price: '2.34' }]

    expect(scoreItemDescription(items)).toBe(1)
})

test('should trim and score', () => {
    const items: Item[] = [
        { shortDescription: '    item 1    ', price: '2.34' },
    ]

    expect(scoreItemDescription(items)).toBe(1)
})

test('should trim and score', () => {
    const items: Item[] = [{ shortDescription: 'item 1', price: '21.40' }]

    expect(scoreItemDescription(items)).toBe(5)
})
