import type { Item } from './item.js'

export interface Receipt {
    retailer: string
    purchaseDate: string
    purchaseTime: string
    items: Item[]
    total: string
}
