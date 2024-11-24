import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { receiptSchema } from './schemas/receipt.js'
import { ReceiptScoringService } from './services/ReceiptScoringService.js'
import { v4 as uuidv4 } from 'uuid'

export const app = new Hono()

const scoredReceiptsRepo = new Map<string, number>()

app.post(
    '/receipts/process',
    zValidator('json', receiptSchema, (result, c) => {
        if (!result.success) {
            return c.text(`The receipt is invalid`, 400)
        }
        const receipt = result.data
        const receiptScoringService = new ReceiptScoringService()

        const score = receiptScoringService.scoreReceipt(receipt)
        const id = uuidv4()

        scoredReceiptsRepo.set(id, score)

        return c.json(
            {
                id,
            },
            200
        )
    })
)

app.get('/receipts/:id/points', (c) => {
    const id = c.req.param('id')
    const score = scoredReceiptsRepo.get(id)

    if (!score) {
        return c.text('No receipt found for that id', 404)
    }

    return c.json({
        points: score,
    })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port,
})
