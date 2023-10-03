import { format } from "date-fns";

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

export const date2UTC = (startDate: Date, startTime: string) => {
  // Create a new Date object with the local date and time
  const localDateTime = new Date(
    `${format(startDate, "yyyy-MM-dd")} ${startTime}`
  );

  // Get the UTC date and time components
  const utcDate = localDateTime.getUTCDate();
  const utcMonth = localDateTime.getUTCMonth() + 1; // Months are zero-based
  const utcYear = localDateTime.getUTCFullYear();
  const utcHours = localDateTime.getUTCHours();
  const utcMinutes = localDateTime.getUTCMinutes();
  const utcSeconds = localDateTime.getUTCSeconds();

  // Create a UTC string in the desired format
  const utcDateTime = `${utcYear}-${utcMonth
    .toString()
    .padStart(2, "0")}-${utcDate.toString().padStart(2, "0")}T${utcHours
    .toString()
    .padStart(2, "0")}:${utcMinutes.toString().padStart(2, "0")}:${utcSeconds
    .toString()
    .padStart(2, "0")}Z`;

  return utcDateTime;
};

export const bytes20ToBytes32 = (addressValue: string) => {
  const addressBytes = addressValue.slice(2); // Remove "0x" prefix
  const padding = "0".repeat(24); // 32 bytes - 20 bytes = 12 bytes = 24 hexadecimal characters
  return `0x${padding}${addressBytes}`;
};
