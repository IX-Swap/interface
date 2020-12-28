import { useEffect, useState } from 'react'
import {
  differenceInYears,
  subYears,
  differenceInMonths,
  differenceInHours,
  subHours,
  differenceInMinutes,
  differenceInSeconds,
  subMonths,
  differenceInDays,
  subDays,
  subMinutes
} from 'date-fns'
import { getInterval } from 'helpers/countdownTimer'
export interface UnitMap {
  [key: string]: number
}
export interface TimerResults {
  units: UnitMap
  diff: number
}

export const useCountdown = (endDate: string | undefined): TimerResults => {
  const [result, setResult] = useState({
    units: {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    diff: 0
  })

  useEffect(() => {
    if (endDate === undefined) {
      return
    }

    const endDatetime = new Date(endDate)
    let diff = endDatetime.getTime() - Date.now()
    let cd = getInterval(diff)

    const getCountdown = (interval?: NodeJS.Timeout) => {
      diff = endDatetime.getTime() - Date.now()
      cd = getInterval(diff)

      if (diff < 0) {
        setResult({
          units: {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          },
          diff: diff
        })
        if (typeof interval !== 'undefined') {
          clearInterval(interval)
        }
        return
      }

      let vDate = endDatetime
      const dNow = Date.now()
      const years = differenceInYears(vDate, dNow)
      if (years > 0) vDate = subYears(vDate, years)
      const months = differenceInMonths(vDate, dNow)
      if (months > 0) vDate = subMonths(vDate, months)
      const days = differenceInDays(vDate, dNow)
      if (days > 0) vDate = subDays(vDate, days)
      const hours = differenceInHours(vDate, dNow)
      if (hours > 0) vDate = subHours(vDate, hours)
      const minutes = differenceInMinutes(vDate, dNow)
      if (minutes > 0) vDate = subMinutes(vDate, minutes)
      const seconds = differenceInSeconds(vDate, dNow)

      setResult({
        units: {
          years: years,
          months: months,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        },
        diff: diff
      })
    }

    getCountdown()

    const interval = setInterval(() => {
      getCountdown(interval)
    }, cd)

    return () => clearInterval(interval)
  }, [endDate])

  return result
}
