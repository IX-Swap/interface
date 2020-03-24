import React from 'react'
import { Stepper, Step, StepLabel, Box } from '@material-ui/core'

export default function Progress ({
  steps,
  activeStep,
  completed
}) {
  return (
    <Box mx={-2}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, i) => {
          const stepProps =
            i <= activeStep && completed
              ? { completed }
              : {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
