import type { Receipt } from '../models/receipt.js'
import { scoreRetailerName } from '../utils/scoreRetailerName.js'
import { scoreTotalRoundAmount } from '../utils/scoreTotalRoundAmount.js'
import { scoreTotalMultiple } from '../utils/scoreTotalMultiple.js'
import { scoreItemCount } from '../utils/scoreItemCount.js'
import { scoreItemDescription } from '../utils/scoreItemDescription.js'
import { scorePurchaseDate } from '../utils/scorePurchaseDate.js'
import { scoreTimeWindow } from '../utils/scoreTimeWindow.js'

// These rules collectively define how many points should be awarded to a receipt.

// One point for every alphanumeric character in the retailer name.
// 50 points if the total is a round dollar amount with no cents.
// 25 points if the total is a multiple of 0.25.
// 5 points for every two items on the receipt.
// If the trimmed length of the item description is a multiple of 3,
//  multiply the price by 0.2 and round up to the nearest integer.
//  The result is the number of points earned.
// 6 points if the day in the purchase date is odd.
// 10 points if the time of purchase is after 2:00pm and before 4:00pm.

export class ReceiptScoringService {
    public scoreReceipt(receipt: Receipt): number {
        let score = 0
        console.log(receipt)
        score += scoreRetailerName(receipt.retailer)
        score += scoreTotalRoundAmount(receipt.total)
        score += scoreTotalMultiple(receipt.total)
        score += scoreItemCount(receipt.items)
        score += scorePurchaseDate(receipt.purchaseDate)
        score += scoreTimeWindow(receipt.purchaseTime)
        score += scoreItemDescription(receipt.items)

        return score
    }

    // private scoreItemDescriptions(items: Item[]): number {
    //     let score = 0
    //     for (let item of items) {
    //         if (item.shortDescription.trim().length % 3 == 0) {
    //             score += Math.ceil(+item.price * 0.2)
    //         }
    //     }

    //     return score
    // }

    // private scoreTimeWindow(purchaseTime: string): number {
    //     const startWindow = new Date(2000, 1, 1, 14, 1)
    //     const endWindow = new Date(2000, 1, 1, 15, 59)
    //     const timeWindow = interval(startWindow, endWindow)

    //     const splitTimeOfPurchase = purchaseTime.split(':')

    //     const timeOfPurchase = new Date(
    //         2000,
    //         1,
    //         1,
    //         +splitTimeOfPurchase[0],
    //         +splitTimeOfPurchase[1]
    //     )

    //     if (isWithinInterval(timeOfPurchase, timeWindow)) {
    //         return 10
    //     }

    //     return 0
    // }

    // private scorePurchaseDate(purchaseDate: string): number {
    //     const date = new Date(purchaseDate)

    //     return (date.getDate() + 1) % 2 == 0 ? 6 : 0
    // }

    // private scoreItemCount(items: Item[]): number {
    //     return Math.floor(items.length / 2) * 5
    // }

    // private scoreTotalMultiple(total: string): number {
    //     if (+total.replace('.', '') % 25 == 0) {
    //         return 25
    //     }

    //     return 0
    // }

    // private scoreTotalRoundAmount(total: string): number {
    //     if (total.endsWith('.00')) {
    //         return 50
    //     }

    //     return 0
    // }

    // private scoreRetailerName(name: string): number {
    //     return name.replace(/[^\w]/g, '').length
    // }
}
