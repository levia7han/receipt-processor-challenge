import type { Item } from '../models/item.js'

// 5 points for every two items on the receipt
export function scoreItemCount(items: Item[]): number {
    return Math.floor(items.length / 2) * 5
}
