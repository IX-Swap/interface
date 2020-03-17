import React from 'react'
import { Card, Box, Typography, Stepper, Step, StepLabel } from '@material-ui/core'

export default function IdentityProgress ({
  title,
  steps,
  activeStep,
  percentage
}) {
  return (
    <Card component='section'>
      <Box p={3}>
        <Box display='flex'>
          <Box flex='1 1 auto'>
            <Typography component='h2' variant='h5'>{title}</Typography>
          </Box>
          <Typography component='h2' variant='h5'>{percentage + '%'}</Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Card>
  )
}
