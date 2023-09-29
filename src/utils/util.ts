const ETH_TO_WEI = 10 ** 18;

export const formatNumberToK = (value: number): string => {
  if (value >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"]; // Add more suffixes for larger numbers if needed
    const suffixIndex = Math.floor(Math.log10(value) / 3);
    const scaledValue = value / Math.pow(10, suffixIndex * 3);
    return scaledValue.toFixed(1) + suffixes[suffixIndex];
  }
  return value.toString();
};

export const numToWei = (value: string | number): string => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  const result = Math.floor(amount * ETH_TO_WEI);
  return result.toString();
};

export const weiToNum = (value: string | bigint): number => {
  const amount = typeof value === "string" ? BigInt(value) : value;
  return Number(amount) / ETH_TO_WEI;
};
