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
        console.log(`name ${score}`)
        score += scoreTotalRoundAmount(receipt.total)
        console.log(`total round ${score}`)
        score += scoreTotalMultiple(receipt.total)
        console.log(`quarter divisable ${score}`)
        score += scoreItemCount(receipt.items)
        console.log(`items count ${score}`)
        score += scorePurchaseDate(receipt.purchaseDate)
        console.log(`date is odd ${receipt.purchaseDate} ${score}`)
        score += scoreTimeWindow(receipt.purchaseTime)
        console.log(`inside time window ${score}`)
        score += scoreItemDescription(receipt.items)
        console.log(`item description ${score}`)

        return score
    }
}
