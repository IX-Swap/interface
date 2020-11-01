import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  toDate
} from 'date-fns'

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

export const formatStartDate = (
  date: Date | string | null | undefined
): string | undefined => {
  const iso = convertDateToISO(date)

  if (iso === undefined) return undefined

  const dateObj = new Date(iso)
  dateObj.setHours(0)
  dateObj.setMinutes(0)
  dateObj.setMilliseconds(0)
  dateObj.setSeconds(0)

  return dateObj.toISOString()
}

export const formatEndDate = (
  date: Date | string | null | undefined
): string | undefined => {
  const iso = convertDateToISO(date)

  if (iso === undefined) return undefined

  const dateObj = new Date(iso)
  dateObj.setHours(23)
  dateObj.setMinutes(59)
  dateObj.setMilliseconds(999)
  dateObj.setSeconds(59)

  return dateObj.toISOString()
}

export const formatDateToMMDDYY = (s?: string): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0 ? format(new Date(s), 'MM/dd/yyyy') : s
}

export const formatDateAndTime = (s?: string, seconds = false): string => {
  if (s === undefined) {
    return ''
  }

  return s.length > 0
    ? format(new Date(s), `LLL d, yyyy hh:mm${seconds ? ':ss' : ''} a`)
    : s
}

export const getTimeAgo = (datetime: string) => {
  const now = Date.now()
  const from = new Date(datetime)
  const minutes = differenceInMinutes(now, from)
  const hours = differenceInHours(now, from)
  const days = differenceInDays(now, from)

  if (minutes === 0) {
    return 'Just now'
  } else if (hours === 0) {
    return `${minutes} m`
  } else if (days === 0) {
    return `${hours} h`
  } else {
    return `${days} d`
  }
}
