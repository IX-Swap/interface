import { useState } from 'react'
import { useTheme } from '@mui/styles'
import { useMediaQuery } from '@mui/material'

export const use2faSteps = (steps: string[]) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [activeStep, setActiveStep] = useState(0)

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const isStepActive = (index: number) => index === activeStep
  const isStepCompleted = (index: number) => index < activeStep
  const isStepFailed = (index: number) => false

  const getVariantsConditions = (index: number) => ({
    active: isStepActive(index),
    completed: isStepCompleted(index),
    error: isStepFailed(index)
  })

  const is2faCompleted = activeStep === 4

  const stepInfo = matches
    ? {
        label: is2faCompleted ? 'Success page' : steps[activeStep],
        activeStep: activeStep + 1,
        totalSteps: steps.length
      }
    : undefined

  return {
    activeStep,
    nextStep,
    prevStep,
    stepperConditions: getVariantsConditions,
    stepInfo,
    isMobile: matches,
    is2faCompleted
  }
}
