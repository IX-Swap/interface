import React, { useState } from 'react'
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid
} from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { ActiveStep } from 'app/pages/security/pages/update2fa/components/ActiveStep'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useStyles } from './Update2fa.styles'

const steps = [
  'Remove Current Authenticator',
  'Scan New QR Code',
  'Backup the Key',
  'Enable New Authenticator'
]

export const Update2fa = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [twoFaData, setTwoFaData] = useState<TwoFaData | undefined>(undefined)
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

  const isBackButtonVisible = activeStep > 0 && activeStep < steps.length
  const isNextButtonVisible = activeStep < steps.length - 1 && activeStep > 0

  return (
    <Grid container spacing={0}>
      <PageHeader title='Change Authenticator' />
      <Grid item xs={12} className={classes.wrapper}>
        <Container>
          <PageHeader title='Change Authenticator' variant={'h6'} />
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
                    twoFaData={twoFaData}
                    handleSuccessfulRemoveAuthenticator={
                      handleSuccessfulFirstStep
                    }
                    index={activeStep}
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
                  {isBackButtonVisible && (
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

                  {isNextButtonVisible && (
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
