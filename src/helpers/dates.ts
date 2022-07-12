import { addBusinessDays, differenceInBusinessDays, isValid } from 'date-fns'
import differenceInDays from 'date-fns/differenceInDays'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import toDate from 'date-fns/toDate'

export const convertISOToDate = (
  date: string | null | undefined
): Date | undefined => {
  if (date === undefined || date === null) {
    return undefined
  }

  if (typeof date === 'string') {
    return date.length > 0 ? new Date(date) : undefined
  }
}

export const convertDateToISO = (
  date: Date | string | null | undefined
): string | undefined => {
  if (date === undefined || date === null) {
    return undefined
  }

  if (typeof date === 'string') {
    return date.length > 0 ? toDate(Number(date)).toISOString() : undefined
  }

  return date.toISOString()
}

export const formatDateToMMDDYY = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0 ? format(new Date(s), 'MM/dd/yyyy') : s
}

export const formatDateToDDMonYYYY = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0 ? format(new Date(s), 'dd MMM. yyyy') : s
}

export const formatDate = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0 ? format(new Date(s), `LLL d, yyyy`) : s
}

export const formatDateAndTime = (s?: string, seconds = false): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0
    ? format(new Date(s), `LLL d, yyyy hh:mm${seconds ? ':ss' : ''} a`)
    : s
}

export const formatReportsDateAndTime = (
  s?: string,
  placeholder?: string
): string => {
  if (s === undefined) {
    return placeholder ?? '-'
  }

  const date = new Date(s)

  if (!isValid(date)) {
    return s
  }

  return s.length > 0 ? format(date, `yyyy-MM-dd, hh:mm a`) : s
}

export const formatTime = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return format(new Date(s), 'hh:mmaa')
}

export const format24HTime = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return format(new Date(s), 'HH:mm:ss')
}

export const getTimeAgo = (datetime: string) => {
  try {
    const now = Date.now()
    const from = new Date(datetime)
    const minutes = differenceInMinutes(now, from)
    const hours = differenceInHours(now, from)
    const days = differenceInDays(now, from)

    if (minutes === 0) {
      return 'Now'
    } else if (hours === 0) {
      return `${minutes} m`
    } else if (days === 0) {
      return `${hours} h`
    } else {
      return `${days} d`
    }
  } catch (error) {}

  return 'Invalid Date'
}

export const getTimeFromNow = (date: Date) => {
  return formatDistance(date, new Date(), { addSuffix: true })
}

export const getTimeAgoFromString = (date: string) => {
  if (date === undefined) {
    return null
  }
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export const getExpiresOrderMessage = (date: Date) => {
  const expirationDay = addBusinessDays(date, 3)
  const now = new Date()
  const daysLeft = differenceInBusinessDays(expirationDay, now)
  const message = 'To complete the trade confirm token transfer ('
  const daysLeftMessage =
    daysLeft <= 0
      ? 'Order expired)'
      : `Order expires in ${daysLeft} business days)`
  return message + daysLeftMessage
}
