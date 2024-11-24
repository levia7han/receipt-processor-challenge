export function scoreRetailerName(name: string): number {
    return name.replace(/[^\w]/g, '').length
}
