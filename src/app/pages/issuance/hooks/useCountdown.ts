import { useEffect, useState } from 'react'
import { addLeadingZeros } from 'helpers/numbers'

export interface TimerResults {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export const useCountdown = (endDate: Date | undefined): TimerResults => {
  const [result, setResult] = useState({})

  useEffect(() => {
    if (endDate === undefined) {
      return
    }

    const getCountdown = (interval?: NodeJS.Timeout) => {
      const diff = new Date(endDate).getTime() - Date.now()

      if (diff < 0) {
        setResult({
          days: addLeadingZeros(0, 2),
          hours: addLeadingZeros(0, 2),
          minutes: addLeadingZeros(0, 2)
        })
        if (typeof interval !== 'undefined') {
          clearInterval(interval)
        }
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setResult({
        days: addLeadingZeros(days, 2),
        hours: addLeadingZeros(hours, 2),
        minutes: addLeadingZeros(minutes, 2)
      })
    }

    getCountdown()

    const cd = 60 * 1000
    const interval = setInterval(() => {
      getCountdown(interval)
    }, cd)

    return () => clearInterval(interval)
  }, [endDate])

  return result
}
