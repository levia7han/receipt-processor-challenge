import { expect, test } from 'vitest'
import { scoreTimeWindow } from '../src/utils/scoreTimeWindow.js'
import type { Receipt } from '../src/models/receipt.js'

test('10 points if time of purchase is after 2:00pm but before 4:00pm', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '15:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTimeWindow(receipt.purchaseTime)).toBe(10)
})

test('0 points if time of purchase is before 2:00pm', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '11:22',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTimeWindow(receipt.purchaseTime)).toBe(0)
})

test('0 points if time of purchase is after 4:00pm', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '17:04',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTimeWindow(receipt.purchaseTime)).toBe(0)
})

test('0 points if time is exactly 2:00pm', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '14:00',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTimeWindow(receipt.purchaseTime)).toBe(0)
})

test('0 points if time is exactly 4:00pm', () => {
    const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-17',
        purchaseTime: '16:00',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(scoreTimeWindow(receipt.purchaseTime)).toBe(0)
})
