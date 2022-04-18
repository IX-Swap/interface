import React from 'react'
import { Step } from '@mui/material'
import { Orientation } from '@mui/material/Stepper/Stepper'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'

const steps = [
  'Step Title 1',
  'Step Title 2',
  'Step Title 3',
  'Step Title 4',
  'Step Title 5',
  'Step Title 6'
]

export interface StepperTemplateProps {
  orientation?: Orientation
}

export const StepperExample = ({
  orientation = 'horizontal'
}: StepperTemplateProps) => {
  const [activeStep, setActiveStep] = React.useState(0)
  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const isStepActive = (index: number) => index === activeStep
  const isStepCompleted = (index: number) => index < activeStep
  const isStepFailed = (index: number) => index === 2 && index < activeStep

  const getVariantsConditions = (index: number) => ({
    active: isStepActive(index),
    completed: isStepCompleted(index),
    error: isStepFailed(index)
  })

  return (
    <Stepper nonLinear orientation={orientation} activeStep={activeStep}>
      {steps.map((label, index) => {
        const step = index + 1

        return (
          <Step key={label} completed={getVariantsConditions(index).completed}>
            <StepButton
              step={step}
              variantsConditions={getVariantsConditions(index)}
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        )
      })}
    </Stepper>
  )
}
