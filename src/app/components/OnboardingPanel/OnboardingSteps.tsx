import React from 'react'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

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
            <StepContent
              style={{ color: index > activeStep ? grey[600] : grey[900] }}
            >
              {step.content.map((content, index) => (
                <Typography
                  key={index}
                  variant='body2'
                  style={{ textTransform: 'capitalize' }}
                >
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
