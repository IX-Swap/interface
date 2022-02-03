import React, { useState } from 'react'
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid
} from '@material-ui/core'
import { Aside } from 'app/pages/security/pages/setup2fa/components/Aside'
import { useSetup2fa } from 'app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'

const steps = [
  'Download app',
  'Scan QR Code',
  'Backup Key',
  'Enable Google Authenticator'
]

export const Setup2fa = () => {
  const { data } = useSetup2fa()
  const [activeStep, setActiveStep] = useState<number>(0)
  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12} lg={2}>
        <Aside />
      </Grid>
      <Grid item xs={12} md={12} lg={10}>
        <Container>
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
                <Grid
                  container
                  spacing={3}
                  justifyContent='center'
                  alignItems='center'
                >
                  {activeStep > 0 && activeStep < steps.length && (
                    <Grid item>
                      <Button
                        variant='outlined'
                        color='primary'
                        disableElevation
                        onClick={() => prevStep()}
                      >
                        Back
                      </Button>
                    </Grid>
                  )}

                  {activeStep < steps.length - 1 && (
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        onClick={() => nextStep()}
                      >
                        Next
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
