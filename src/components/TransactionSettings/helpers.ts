import { DEFAULT_DEADLINE_FROM_NOW } from 'constants/misc'
import { Percent } from '@uniswap/sdk-core'

export const displayDeadline = ({ deadlineInput, deadline }: { deadlineInput: string; deadline: number }) => {
  return deadlineInput.length > 0
    ? deadlineInput
    : deadline === DEFAULT_DEADLINE_FROM_NOW
    ? ''
    : (deadline / 60).toString()
}

export const displayUserSlippageTolerance = ({
  slippageInput,
  userSlippageTolerance,
}: {
  slippageInput: string
  userSlippageTolerance: Percent | 'auto'
}) => {
  return slippageInput.length > 0
    ? slippageInput
    : userSlippageTolerance === 'auto'
    ? ''
    : userSlippageTolerance.toFixed(2)
}
