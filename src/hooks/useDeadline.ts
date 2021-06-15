import { useState } from 'react'
import { useUserTransactionTTL } from 'state/user/hooks'
import { DEFAULT_DEADLINE_FROM_NOW } from 'constants/misc'

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}
export const useDeadline = () => {
  const [deadline, setDeadline] = useUserTransactionTTL()
  const [deadlineInput, setDeadlineInput] = useState('')
  const [deadlineError, setDeadlineError] = useState<DeadlineError | false>(false)

  const parseCustomDeadline = (value: string) => {
    // populate what the user typed and clear the error
    setDeadlineInput(value)
    setDeadlineError(false)

    if (value.length === 0) {
      setDeadline(DEFAULT_DEADLINE_FROM_NOW)
    } else {
      try {
        const parsed: number = Math.floor(Number.parseFloat(value) * 60)
        if (!Number.isInteger(parsed) || parsed < 60 || parsed > 180 * 60) {
          setDeadlineError(DeadlineError.InvalidInput)
        } else {
          setDeadline(parsed)
        }
      } catch (error) {
        console.error(error)
        setDeadlineError(DeadlineError.InvalidInput)
      }
    }
  }
  const resetDeadline = () => {
    setDeadlineInput('')
    setDeadlineError(false)
  }

  return {
    deadline,
    deadlineInput,
    deadlineError,
    parseCustomDeadline,
    resetDeadline,
  }
}
