export const formatNumberToK = (value: number): string => {
    if (value >= 1000) {
        const suffixes = ["", "K", "M", "B", "T"]; // Add more suffixes for larger numbers if needed
        const suffixIndex = Math.floor(Math.log10(value) / 3);
        const scaledValue = value / Math.pow(10, suffixIndex * 3);
        return scaledValue.toFixed(1) + suffixes[suffixIndex];
    }
    return value.toString();
}
