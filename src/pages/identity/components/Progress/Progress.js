import React from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'

export default function Progress ({
  steps,
  activeStep
}) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
