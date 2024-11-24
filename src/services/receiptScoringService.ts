import type { Receipt } from '../models/receipt.js'
import { scoreRetailerName } from '../utils/scoreRetailerName.js'
import { scoreTotalRoundAmount } from '../utils/scoreTotalRoundAmount.js'
import { scoreTotalMultiple } from '../utils/scoreTotalMultiple.js'
import { scoreItemCount } from '../utils/scoreItemCount.js'
import { scoreItemDescription } from '../utils/scoreItemDescription.js'
import { scorePurchaseDate } from '../utils/scorePurchaseDate.js'
import { scoreTimeWindow } from '../utils/scoreTimeWindow.js'

export class ReceiptScoringService {
    public scoreReceipt(receipt: Receipt): number {
        let score = 0

        score += scoreRetailerName(receipt.retailer)
        score += scoreTotalRoundAmount(receipt.total)
        score += scoreTotalMultiple(receipt.total)
        score += scoreItemCount(receipt.items)
        score += scorePurchaseDate(receipt.purchaseDate)
        score += scoreTimeWindow(receipt.purchaseTime)
        score += scoreItemDescription(receipt.items)

        return score
    }
}
