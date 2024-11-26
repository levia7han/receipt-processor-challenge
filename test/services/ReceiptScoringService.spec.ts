import { expect, test } from 'vitest'
import { ReceiptScoringService } from '../../src/services/ReceiptScoringService.js'
test('receipt scored correctly', () => {
    const receiptScoringService = new ReceiptScoringService()

    const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-02',
        purchaseTime: '13:13',
        total: '1.25',
        items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    }
    expect(receiptScoringService.scoreReceipt(receipt)).toBe(31)
})

test('receipt scored correctly', () => {
    const receiptScoringService = new ReceiptScoringService()

    const receipt = {
        retailer: 'Walgreens',
        purchaseDate: '2022-01-02',
        purchaseTime: '08:13',
        total: '2.65',
        items: [
            { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
            { shortDescription: 'Dasani', price: '1.40' },
        ],
    }
    expect(receiptScoringService.scoreReceipt(receipt)).toBe(15)
})

test('receipt scored correctly', () => {
    const receiptScoringService = new ReceiptScoringService()

    const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
            {
                shortDescription: 'Mountain Dew 12PK',
                price: '6.49',
            },
            {
                shortDescription: 'Emils Cheese Pizza',
                price: '12.25',
            },
            {
                shortDescription: 'Knorr Creamy Chicken',
                price: '1.26',
            },
            {
                shortDescription: 'Doritos Nacho Cheese',
                price: '3.35',
            },
            {
                shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
                price: '12.00',
            },
        ],
        total: '35.35',
    }
    expect(receiptScoringService.scoreReceipt(receipt)).toBe(28)
})

test('receipt scored correctly', () => {
    const receiptScoringService = new ReceiptScoringService()

    const receipt = {
        retailer: 'M&M Corner Market',
        purchaseDate: '2022-03-20',
        purchaseTime: '14:33',
        items: [
            {
                shortDescription: 'Gatorade',
                price: '2.25',
            },
            {
                shortDescription: 'Gatorade',
                price: '2.25',
            },
            {
                shortDescription: 'Gatorade',
                price: '2.25',
            },
            {
                shortDescription: 'Gatorade',
                price: '2.25',
            },
        ],
        total: '9.00',
    }
    expect(receiptScoringService.scoreReceipt(receipt)).toBe(109)
})
