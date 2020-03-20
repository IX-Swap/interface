import React from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'

export default function Progress ({
  steps,
  activeStep,
  completed
}) {
  const stepProps = typeof completed === 'boolean' ? { completed } : {}

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map(label => (
        <Step key={label} {...stepProps}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
