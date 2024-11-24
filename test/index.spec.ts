import { expect, test } from 'vitest'
import { app } from '../src/index.js'

test('POST /receipts/process', async () => {
    const res = await app.request('/receipts/process', {
        method: 'POST',
        body: JSON.stringify({
            retailer: 'Target',
            purchaseDate: '2022-01-02',
            purchaseTime: '13:13',
            total: '1.25',
            items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    expect(res.status).toBe(200)

    expect(await res.json()).toEqual({
        id: expect.any(String),
    })
})

test('GET /receipts/:id/points', async () => {
    const processResult = await app.request('/receipts/process', {
        method: 'POST',
        body: JSON.stringify({
            retailer: 'Target',
            purchaseDate: '2022-01-02',
            purchaseTime: '13:13',
            total: '1.25',
            items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    const id = (await processResult.json()).id

    const res = await app.request(`/receipts/${id}/points`, {
        method: 'GET',
    })

    expect(res.status).toBe(200)

    expect(await res.json()).toEqual({
        points: 31,
    })
})

test('POST /receipts/process bad input', async () => {
    const res = await app.request('/receipts/process', {
        method: 'POST',
        body: JSON.stringify({
            retailer: 'Target@',
            purchaseDate: '2022-01-02',
            purchaseTime: '13:13',
            total: 'd1.25',
            items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    expect(res.status).toBe(400)

    expect(await res.text()).toStrictEqual('The receipt is invalid')
})

test('GET /receipts/:id/points id not found', async () => {
    const res = await app.request(`/receipts/not-found/points`, {
        method: 'GET',
    })

    expect(res.status).toBe(404)

    expect(await res.text()).toStrictEqual('No receipt found for that id')
})
