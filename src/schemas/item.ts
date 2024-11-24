import { z } from 'zod'

export const itemSchema = z.object({
    shortDescription: z.string(),
    price: z
        .string()
        .regex(
            new RegExp('^\\d+\\.\\d{2}$'),
            'Total amount needs to be in the format of 0.00'
        ),
})
