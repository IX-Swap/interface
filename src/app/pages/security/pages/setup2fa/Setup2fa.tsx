import React, { useState } from 'react'
import { Container, Box, Stepper, Step, StepLabel, Grid } from '@mui/material'
import { Aside } from 'app/pages/security/pages/setup2fa/components/Aside'
import { useSetup2fa } from 'app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'
import { useStyles } from './Setup2fa.styles'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons/ChangeStepButtons'

const steps = [
  'Download app',
  'Scan QR Code',
  'Backup Key',
  'Enable Authenticator'
]

export const Setup2fa = () => {
  const classes = useStyles()
  const { data } = useSetup2fa()
  const [activeStep, setActiveStep] = useState(0)
  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }
  const isBackButtonVisible = activeStep > 0 && activeStep < steps.length
  const isNextButtonVisible = activeStep < steps.length - 1

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12} lg={2}>
        <Aside />
      </Grid>
      <Grid item xs={12} md={12} lg={10}>
        <Container className={classes.wrapper}>
          <Box>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              direction='column'
            >
              <Grid item>
                <Box mt={4} mb={6} width='100%'>
                  <ActiveStep
                    index={activeStep}
                    twoFaData={data}
                    nextStep={nextStep}
                  />
                </Box>
              </Grid>
              <Grid item>
                <ChangeStepButtons
                  isBackButtonVisible={isBackButtonVisible}
                  isNextButtonVisible={isNextButtonVisible}
                  onBackButtonClick={prevStep}
                  onNextButtonClick={nextStep}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
