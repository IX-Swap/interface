import { formatISO, format } from 'date-fns'

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

export const convertStringToMMDDYY = (s: string): string => {
  return format(new Date(s), 'MM/dd/yy')
}
