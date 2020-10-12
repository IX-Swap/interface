import {
  formatISO,
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays
} from 'date-fns'

export const convertDateToISO = (
  date: Date | string | null | undefined
): string | undefined => {
  if (date === undefined || date === null) {
    return undefined
  }

  if (typeof date === 'string') {
    return date.length > 0 ? formatISO(Number(date)) : undefined
  }

  return formatISO(date)
}

export const formatDateToMMDDYY = (s: string): string => {
  return format(new Date(s), 'MM/dd/yy')
}

export const formatDateAndTime = (s: string): string => {
  return format(new Date(s), 'LLL d, yyyy hh:mm a')
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
