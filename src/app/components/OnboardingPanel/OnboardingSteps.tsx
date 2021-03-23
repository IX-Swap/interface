import React from 'react'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { useTheme } from '@material-ui/core/styles'

export interface OnboardingStepsProps {
  steps: Array<{ title: string; content: string[] }>
  activeStep: number
}

export const OnboardingSteps = ({
  steps,
  activeStep
}: OnboardingStepsProps) => {
  const theme = useTheme()

  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {steps.map((step, index) => (
        <Step key={step.title} expanded>
          <StepLabel>{step.title}</StepLabel>
          {step.content.length > 0 ? (
            <StepContent
              style={{
                color:
                  theme.palette.type === 'light'
                    ? grey[600]
                    : 'rgba(255, 255, 255, 0.6)'
              }}
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
