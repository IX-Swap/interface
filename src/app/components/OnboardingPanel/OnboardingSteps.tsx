import React from 'react'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'

export interface OnboardingStepsProps {
  steps: Array<{ title: string; content: string[] }>
  activeStep: number
}

export const OnboardingSteps = ({
  steps,
  activeStep
}: OnboardingStepsProps) => {
  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {steps.map((step, index) => (
        <Step key={step.title} expanded>
          <StepLabel>{step.title}</StepLabel>
          {step.content.length > 0 ? (
            <StepContent>
              {step.content.map((content, index) => (
                <Typography key={index} variant='body2'>
                  {content}
                </Typography>
              ))}
            </StepContent>
          ) : null}
        </Step>
      ))}
    </Stepper>
  )
}
