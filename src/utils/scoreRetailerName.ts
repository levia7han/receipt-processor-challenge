// One point for every alphanumeric character in the retailer name
export function scoreRetailerName(name: string): number {
    return name.replace(/[^\w]/g, '').length
}
