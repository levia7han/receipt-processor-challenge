export function scoreTotalRoundAmount(total: string): number {
    if (total.endsWith('.00')) {
        return 50
    }

    return 0
}
