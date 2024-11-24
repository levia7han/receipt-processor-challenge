import { expect, test } from 'vitest'
import { scoreTotalRoundAmount } from '../../src/utils/scoreTotalRoundAmount.js'
import type { Receipt } from '../../src/models/receipt.js'

test('should return a score when total has no cents', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '4.00',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTotalRoundAmount(receipt.total)).toBe(50)
})

test('should return no score when total has cents', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '4.24',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTotalRoundAmount(receipt.total)).toBe(0)
})
