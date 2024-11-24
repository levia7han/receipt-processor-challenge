import { expect, test } from 'vitest'
import { scoreItemCount } from '../src/utils/scoreItemCount.js'
import type { Item } from '../src/models/item.js'

test('items quantities scored correctly', () => {
    const items: Item[] = [
        { shortDescription: 'item 1', price: '2.34' },
        { shortDescription: 'item 2', price: '1.30' },
    ]

    expect(scoreItemCount(items)).toBe(5)
})

test('single item is not scored', () => {
    const items: Item[] = [{ shortDescription: 'item 1', price: '2.34' }]

    expect(scoreItemCount(items)).toBe(0)
})

test('single item is not scored', () => {
    const items: Item[] = [
        { shortDescription: 'item 1', price: '2.34' },
        { shortDescription: 'item 1', price: '2.34' },
        { shortDescription: 'item 1', price: '2.34' },
        { shortDescription: 'item 1', price: '2.34' },
        { shortDescription: 'item 1', price: '2.34' },
    ]

    expect(scoreItemCount(items)).toBe(10)
})
