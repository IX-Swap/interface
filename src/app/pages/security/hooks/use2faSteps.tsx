import { useState } from 'react'

export const use2faSteps = (steps: string[]) => {
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

  const stepInfo = {
    label: is2faCompleted ? 'Success page' : steps[activeStep],
    activeStep: activeStep + 1,
    totalSteps: steps.length
  }

  return {
    activeStep,
    nextStep,
    prevStep,
    stepperConditions: getVariantsConditions,
    stepInfo,
    is2faCompleted
  }
}
