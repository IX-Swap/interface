import { useEffect, useState } from 'react'

export const CONGESTION_START_TIME = 1

export const useTransactionTimer = () => {
  const [startedTimer, setTimer] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const setStartedTimer = (value: boolean) => {
    setTimer(value)
    setSeconds(0)
  }
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (startedTimer) {
      timer = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    }
    if (!startedTimer) {
      if (timer !== null) {
        clearInterval(timer)
      }
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer)
      }
    }
  }, [startedTimer])
  return { seconds, setStartedTimer }
}
