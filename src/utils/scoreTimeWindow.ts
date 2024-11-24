import { interval, isWithinInterval } from 'date-fns'

// 10 points if the time of purchase is after 2:00pm and before 4:00pm
export function scoreTimeWindow(purchaseTime: string): number {
    const startWindow = new Date(2000, 1, 1, 14, 1)
    const endWindow = new Date(2000, 1, 1, 15, 59)
    const timeWindow = interval(startWindow, endWindow)

    const splitTimeOfPurchase = purchaseTime.split(':')

    const timeOfPurchase = new Date(
        2000,
        1,
        1,
        +splitTimeOfPurchase[0],
        +splitTimeOfPurchase[1]
    )

    if (isWithinInterval(timeOfPurchase, timeWindow)) {
        return 10
    }

    return 0
}
