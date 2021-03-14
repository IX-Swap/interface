export const getIdentityDefaultActiveStep = (args: {
  isSubmitted: boolean
  lastStepIndex: number
  isJourneyCompleted: boolean
}) => {
  const { isJourneyCompleted, isSubmitted, lastStepIndex } = args

  return isJourneyCompleted ? (isSubmitted ? lastStepIndex : 0) : undefined
}
