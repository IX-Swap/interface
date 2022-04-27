import React, { useEffect, useState } from 'react'
import { Step, Grid, Typography } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { ActiveStep } from 'app/pages/security/pages/update2fa/components/ActiveStep'
import { useStyles } from './Update2fa.styles'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons'
import { useAuth } from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'

const steps = [
  'Remove Current Authenticator',
  'Scan QR Code',
  'Backup Key',
  'Enable Authenticator'
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

  const isStepActive = (index: number) => index === activeStep
  const isStepCompleted = (index: number) => index < activeStep
  // TODO Added necessary logic here
  const isStepFailed = (index: number) => false

  const getVariantsConditions = (index: number) => ({
    active: isStepActive(index),
    completed: isStepCompleted(index),
    error: isStepFailed(index)
  })

  return (
    <Grid container xs={12} className={classes.wrapper}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
        className={classes.leftBlock}
      >
        <Grid item>
          <ActiveStep
            twoFaData={twoFaData}
            handleSuccessfulRemoveAuthenticator={handleSuccessfulFirstStep}
            index={activeStep}
            nextStep={nextStep}
          />
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
      <Grid
        item
        container
        flexDirection={'column'}
        className={classes.rightBlock}
      >
        <Grid item>
          <Typography variant={'h6'} className={classes.progressTitle}>
            Progress
          </Typography>
        </Grid>
        <Grid item>
          <Stepper orientation={'vertical'} activeStep={activeStep} nonLinear>
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={getVariantsConditions(index).completed}
              >
                <StepButton
                  step={index + 1}
                  variantsConditions={getVariantsConditions(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Grid>
  )
}
