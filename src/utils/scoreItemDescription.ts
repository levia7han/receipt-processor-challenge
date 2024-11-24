import type { Item } from '../models/item.js'

export function scoreItemDescription(items: Item[]): number {
    let score = 0
    for (let item of items) {
        if (item.shortDescription.trim().length % 3 == 0) {
            score += Math.ceil(+item.price * 0.2)
        }
    }

    return score
}
