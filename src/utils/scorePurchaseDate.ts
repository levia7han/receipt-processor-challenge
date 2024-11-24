export function scorePurchaseDate(purchaseDate: string): number {
    const date = new Date(purchaseDate)

    return (date.getDate() + 1) % 2 == 0 ? 0 : 6
}
