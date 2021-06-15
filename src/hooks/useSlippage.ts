import { useState } from 'react'
import { Percent } from '@ixswap1/sdk-core'

import { useSetUserSlippageTolerance, useUserSlippageTolerance } from 'state/user/hooks'

enum SlippageError {
  InvalidInput = 'InvalidInput',
}

export const useSlippage = () => {
  const userSlippageTolerance = useUserSlippageTolerance()
  const setUserSlippageTolerance = useSetUserSlippageTolerance()
  const [slippageInput, setSlippageInput] = useState('')
  const [slippageError, setSlippageError] = useState<SlippageError | false>(false)

  const parseSlippageInput = (value: string) => {
    // populate what the user typed and clear the error
    setSlippageInput(value)
    setSlippageError(false)

    if (value.length === 0) {
      setUserSlippageTolerance('auto')
    } else {
      const parsed = Math.floor(Number.parseFloat(value) * 100)

      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
        setUserSlippageTolerance('auto')
        if (value !== '.') {
          setSlippageError(SlippageError.InvalidInput)
        }
      } else {
        setUserSlippageTolerance(new Percent(parsed, 10_000))
      }
    }
  }
  const resetSlippage = () => {
    setSlippageInput('')
    setSlippageError(false)
  }
  const tooLow = userSlippageTolerance !== 'auto' && userSlippageTolerance.lessThan(new Percent(5, 10_000))
  const tooHigh = userSlippageTolerance !== 'auto' && userSlippageTolerance.greaterThan(new Percent(1, 100))

  return {
    userSlippageTolerance,
    slippageInput,
    slippageError,
    tooLow,
    tooHigh,
    resetSlippage,
    parseSlippageInput,
  }
}
