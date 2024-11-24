import { expect, test } from 'vitest'
import { scorePurchaseDate } from '../../src/utils/scorePurchaseDate.js'
import type { Receipt } from '../../src/models/receipt.js'

test('6 points if purchase date is odd', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scorePurchaseDate(receipt.purchaseDate)).toBe(6)
})

test('no points if purchase date is even', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-02',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scorePurchaseDate(receipt.purchaseDate)).toBe(0)
})

test('points for first of month', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-04-01',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scorePurchaseDate(receipt.purchaseDate)).toBe(6)
})
