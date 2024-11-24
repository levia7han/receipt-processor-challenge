export function scorePurchaseDate(purchaseDate: string): number {
    const splitDate = purchaseDate.split('-')

    const date = new Date(+splitDate[0], +splitDate[1], +splitDate[2])

    return date.getDate() % 2 == 0 ? 0 : 6
}
