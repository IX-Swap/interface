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

// save token expiration for planned time - 1 minute
export const getTokenExpiration = (time: keyof typeof timePeriods) => {
  const currentUTCTime = dayjs.utc().unix().valueOf()
  // expire login 4 minutes before because we have an interval once in 4 minutes of fetching user sec tokens which relogins if token expired
  const timeAfterInterval = currentUTCTime + timePeriods[time] - 4 * timePeriods['1 minute']
  return timeAfterInterval
}

// renew token when expiration has passed current time
export const shouldRenewToken = (time: number) => {
  const currentUTCTime = dayjs.utc().unix().valueOf()
  return currentUTCTime >= time
}

export const durationInHours = (deadline?: null | string) => {
  const currentTime = dayjs()
  const deadlineTime = dayjs(deadline ?? '')
  return deadline && deadlineTime.isAfter(currentTime) ? deadlineTime.diff(currentTime, 'h') : null
}
