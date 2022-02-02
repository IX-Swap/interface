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
import { RemoveCurrentAuthenticator } from 'app/pages/security/pages/update2fa/components/RemoveCurrentAuthenticator'
import { Step2Scan } from './components/Step2Scan'
import { Step3Backup } from './components/Step3Backup'
import { Step4Enable } from './components/Step4Enable'
import { Enabled } from 'app/pages/security/pages/setup2fa/components/Enabled'
import { TwoFaData } from 'app/pages/security/pages/update2fa/types'

const steps = [
  'Remove Current Authenticator',
  'Scan New QR Code',
  'Backup the Key',
  'Enable New Authenticator'
]

const getComponent = (
  index: number,
  twoFaData: TwoFaData | null,
  nextStep: () => void,
  handleSuccessfulRemoveAuthenticator: (twoFaData: TwoFaData) => void
) => {
  switch (index) {
    case 0:
      return (
        <RemoveCurrentAuthenticator
          onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
        />
      )
    case 1:
      return <Step2Scan twoFaData={twoFaData} />
    case 2:
      return <Step3Backup twoFaData={twoFaData} />
    case 3:
      return <Step4Enable nextStep={nextStep} />
    default:
      return <Enabled />
  }
}

export const Update2fa = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [twoFaData, setTwoFaData] = useState<TwoFaData | null>(null)
  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSuccessfulFirstStep = (twoFaData: TwoFaData) => {
    setTwoFaData(twoFaData)
    nextStep()
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
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
                  {getComponent(
                    activeStep,
                    twoFaData,
                    nextStep,
                    handleSuccessfulFirstStep
                  )}
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

                  {activeStep < steps.length - 1 && activeStep > 0 && (
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
