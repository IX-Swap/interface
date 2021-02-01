import React from 'react'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core'
import { useOnboardingSteps } from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import { grey } from '@material-ui/core/colors'

export const OnboardingSteps = () => {
  const { activeStep, onboardingSteps } = useOnboardingSteps()

  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {onboardingSteps.map((step, index) => (
        <Step key={step.title} expanded>
          <StepLabel>{step.title}</StepLabel>
          {step.content.length > 0 ? (
            <StepContent
              style={{ color: index > activeStep ? grey[600] : grey[900] }}
            >
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
