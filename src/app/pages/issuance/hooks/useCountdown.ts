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
    let interval = getInterval(diff)

    const getCountdown = (countdownInterval?: NodeJS.Timeout) => {
      diff = endDatetime.getTime() - Date.now()
      interval = getInterval(diff)

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
        if (typeof countdownInterval !== 'undefined') {
          clearInterval(countdownInterval)
        }
        return
      }

      let currentEndDate = endDatetime
      const dateNow = Date.now()
      const years = differenceInYears(currentEndDate, dateNow)
      if (years > 0) currentEndDate = subYears(currentEndDate, years)
      const months = differenceInMonths(currentEndDate, dateNow)
      if (months > 0) currentEndDate = subMonths(currentEndDate, months)
      const days = differenceInDays(currentEndDate, dateNow)
      if (days > 0) currentEndDate = subDays(currentEndDate, days)
      const hours = differenceInHours(currentEndDate, dateNow)
      if (hours > 0) currentEndDate = subHours(currentEndDate, hours)
      const minutes = differenceInMinutes(currentEndDate, dateNow)
      if (minutes > 0) currentEndDate = subMinutes(currentEndDate, minutes)
      const seconds = differenceInSeconds(currentEndDate, dateNow)

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

    const countdownInterval = setInterval(() => {
      getCountdown(countdownInterval)
    }, interval) as unknown as NodeJS.Timeout

    return () => clearInterval(countdownInterval)
  }, [endDate])

  return result
}
