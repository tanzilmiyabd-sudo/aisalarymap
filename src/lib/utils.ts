import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
  return num.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getQualityLabel(score: number): { label: string; color: string } {
  if (score >= 9) return { label: 'Excellent', color: 'text-green-400' }
  if (score >= 8) return { label: 'Great', color: 'text-emerald-400' }
  if (score >= 7) return { label: 'Good', color: 'text-blue-400' }
  if (score >= 6) return { label: 'Average', color: 'text-yellow-400' }
  return { label: 'Below Average', color: 'text-red-400' }
}

export function getDemandLabel(score: number): { label: string; color: string } {
  if (score >= 9) return { label: 'Very High', color: 'text-green-400' }
  if (score >= 7) return { label: 'High', color: 'text-blue-400' }
  if (score >= 5) return { label: 'Medium', color: 'text-yellow-400' }
  return { label: 'Low', color: 'text-red-400' }
}

export function getContinentEmoji(continent: string): string {
  const emojis: Record<string, string> = {
    'Europe': '🇪🇺',
    'Asia': '🌏',
    'North America': '🌎',
    'South America': '🌎',
    'Africa': '🌍',
    'Oceania': '🌏',
  }
  return emojis[continent] || '🌍'
}