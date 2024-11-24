import { z } from 'zod'
import { itemSchema } from './item.js'

export const receiptSchema = z.object({
    retailer: z
        .string()
        .regex(
            new RegExp('^[\\w\\s\\-&]+$'),
            'retailer must be in the form of'
        ),
    purchaseDate: z.string().date('date is invalid'),
    purchaseTime: z.string().regex(/^\d{2}:\d{2}$/),
    items: z.array(itemSchema).nonempty('You must have at least one item'),
    total: z
        .string()
        .regex(
            new RegExp('^\\d+\\.\\d{2}$'),
            'Total amount needs to be in the format of 0.00'
        ),
})
