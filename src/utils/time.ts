import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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
  const timeAfterInterval = currentUTCTime + timePeriods[time] - timePeriods['1 minute']
  return timeAfterInterval
}

// renew token when expiration has passed current time
export const shouldRenewToken = (time: number) => {
  const currentUTCTime = dayjs.utc().unix().valueOf()
  return currentUTCTime >= time
}
