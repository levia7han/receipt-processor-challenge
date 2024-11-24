// 25 points if the total is a multiple of 0.25
export function scoreTotalMultiple(total: string): number {
    if (+total.replace('.', '') % 25 == 0) {
        return 25
    }

    return 0
}
