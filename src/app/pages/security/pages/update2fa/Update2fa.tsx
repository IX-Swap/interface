import React, { useEffect, useState } from 'react'
import { Container, Box, Stepper, Step, StepLabel, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { ActiveStep } from 'app/pages/security/pages/update2fa/components/ActiveStep'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useStyles } from './Update2fa.styles'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons'
import { useAuth } from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'
import { VSpacer } from 'components/VSpacer'

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
  const { user } = useAuth()

  useEffect(() => {
    if (user !== undefined && !user.totpConfirmed) {
      history.push(SecurityRoute.setup2fa)
    }
    // eslint-disable-next-line
  }, [])
  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }
  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSuccessfulFirstStep = (newTwoFaData: TwoFaData) => {
    setTwoFaData(newTwoFaData)
    nextStep()
  }

  const isBackButtonVisible = activeStep > 1 && activeStep < steps.length
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
                <VSpacer size={'medium'} />
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
