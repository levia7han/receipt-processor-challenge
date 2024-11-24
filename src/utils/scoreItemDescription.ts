import type { Item } from '../models/item.js'

/**
 * If the trimmed length of the item description is a multiple of 3,
 * multiply the price by 0.2 and round up to the nearest integer.
 * The result is the number of points earned.
 */
export function scoreItemDescription(items: Item[]): number {
    let score = 0
    for (let item of items) {
        if (item.shortDescription.trim().length % 3 == 0) {
            score += Math.ceil(+item.price * 0.2)
        }
    }

    return score
}
