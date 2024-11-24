import { z } from 'zod'
import { itemSchema } from './item.js'

export const receiptSchema = z.object({
    retailer: z
        .string()
        .regex(
            new RegExp('^[\\w\\s\\-&]+$'),
            `Retailer must be alpha numeric and only include '-' or '&' special characters`
        ),
    purchaseDate: z
        .string()
        .date(`Date is invalid, must be in 'YYYY-MM-DD' format`),
    purchaseTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, `Must be in the form of '00:00'`),
    items: z.array(itemSchema).nonempty('You must have at least one item'),
    total: z
        .string()
        .regex(
            new RegExp('^\\d+\\.\\d{2}$'),
            'Total amount needs to be in the format of 0.00'
        ),
})
