import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function safeAsync<T,E=Error> (promise :Promise<T>): Promise<[null,T] | [E,null]> {
  try {
    const res = await promise
    return [null,res]
  } catch (err) {
    return [err as E,null]
  }
}


export function convertToSubCurreny(amount: number, factor: number = 100) {
  return Math.round(amount*factor);
}


export function addDays(date: Date, days: number) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate()+days)
  return newDate
}