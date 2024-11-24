export function scoreTotalMultiple(total: string): number {
    if (+total.replace('.', '') % 25 == 0) {
        return 25
    }

    return 0
}
