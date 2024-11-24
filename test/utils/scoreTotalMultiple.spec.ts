import { expect, test } from 'vitest'
import { scoreTotalMultiple } from '../../src/utils/scoreTotalMultiple.js'
import type { Receipt } from '../../src/models/receipt.js'

test('should return a score when total is multiple of .25', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTotalMultiple(receipt.total)).toBe(25)
})

test('should return a score when total is multiple of .25', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '20.50',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTotalMultiple(receipt.total)).toBe(25)
})
test('should return no score when not divisible by .25', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '8.37',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTotalMultiple(receipt.total)).toBe(0)
})
