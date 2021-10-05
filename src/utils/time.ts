import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'

dayjs.extend(utc)
dayjs.extend(duration)

export enum timePeriods {
  '1 year' = 31536000,
  '1 week' = 604800,
  '1 day' = 86400,
  '1 hour' = 3600,
  '1 minute' = 60,
}

// save token expiration for planned time
export const getTokenExpiration = (time: keyof typeof timePeriods) => {
  const currentUTCTime = dayjs.utc().unix().valueOf()
  // expire a bit before
  const timeAfterInterval = currentUTCTime + timePeriods[time] - 2 * timePeriods['1 minute']
  return timeAfterInterval
}

// renew token when expiration has passed current time
export const shouldRenewToken = (time?: number) => {
  if (time === undefined) {
    return true
  }
  const currentUTCTime = dayjs.utc().unix().valueOf()
  return currentUTCTime >= time
}

export const durationInHours = (deadline?: null | string) => {
  const currentTime = dayjs()
  const deadlineTime = dayjs(deadline ?? '')
  return deadline && deadlineTime.isAfter(currentTime) ? deadlineTime.diff(currentTime, 'h') : null
}

export const unixTimeToFormat = ({ time, format = 'DD.MM.YYYY, hh:mm a' }: { time: number; format?: string }) => {
  return dayjs.unix(time).format(format)
}

export const closestFutureDate = ({ dates }: { dates: number[] }) => {
  const currentDate = dayjs().unix()

  const futureDates = dates.filter((date) => date - currentDate > 0)
  return futureDates.length > 0 ? futureDates.shift() : null
}

export const getPayoutClosestToPresent = ({ payouts }: { payouts: [number, string][] }) => {
  const currentDate = dayjs().unix()

  const pastPayouts = payouts.filter((value) => value[0] - currentDate <= 0)
  return pastPayouts.length > 0 ? pastPayouts.pop() : null
}

export const getNextPayoutTime = ({ payouts }: { payouts: [number, string][] }) => {
  const currentDate = dayjs().unix()
  const futurePayouts = payouts.filter((value) => value[0] - currentDate >= 0)
  return futurePayouts.length > 0 ? futurePayouts[0] : null
}
