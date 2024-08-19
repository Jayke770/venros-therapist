import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a min",
    mm: "%d mins",
    h: "an hr",
    hh: "%d hrs",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
class Utils {
  formatDate(date?: string | number | Date) {
    return dayjs(date).fromNow()
  }
  toWei(amount: string | number, decimal: number = 18) {
    return parseInt(`${parseFloat(`${amount}`) * 10 ** (decimal)}`)
  }
  toEther(amount: string | number, decimal: number = 18) {
    return parseFloat(`${amount}`) * 10 ** (-decimal)
  }
  formatNumber(num: string | number, isDollar: boolean = false): string {
    if (isDollar) return `${parseFloat(num.toString()).toFixed(2)}`;
    const numStrs = parseFloat(num.toString()).toFixed(18).split(".");
    let count = 0, zero = 0, numStr = "";
    if (numStrs.length === 2) {
      for (const char of numStrs[1]) {
        numStr += char;
        zero += 1;
        if (char !== "0") {
          count += 1;
        } else {
          if (count === 1) {
            count += 1;
            break;
          }
        }
        if (count === 2) {
          break;
        }
      }
    }
    const result = (numStrs.length === 2 && count === 2) ? `${numStrs[0]}.${numStr}` : parseFloat(num.toString()).toFixed(2);
    return result;
  }
  formatTokenSymbol(symbol: string | null): string {
    return symbol?.startsWith("$") ? symbol : `$${symbol}`
  }
}
export const utils = new Utils()
export const dayJs = dayjs