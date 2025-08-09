export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(undefined, options)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => func.apply(null, args), delay)
  }
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}