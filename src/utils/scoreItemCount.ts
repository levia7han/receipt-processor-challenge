import type { Item } from '../models/item.js'

export function scoreItemCount(items: Item[]): number {
    return Math.floor(items.length / 2) * 5
}
