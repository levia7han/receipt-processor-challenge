import { expect, test } from 'vitest'
import { scoreRetailerName } from '../../src/utils/scoreRetailerName.js'
import type { Receipt } from '../../src/models/receipt.js'

test('correctly scores name', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreRetailerName(receipt.retailer)).toBe(6)
})

test('does not count "&" or "-"', () => {
    const receipt: Receipt = {
        retailer: '-&',
        purchaseDate: '2022-01-17',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreRetailerName(receipt.retailer)).toBe(0)
})
