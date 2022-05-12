import { Grid, Step, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/styles'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons'
import { ActiveStep } from 'app/pages/security/pages/update2fa/components/ActiveStep'
import { SecurityRoute } from 'app/pages/security/router/config'
import { TwoFaData } from 'app/pages/security/types'
import { history } from 'config/history'
import { useAuth } from 'hooks/auth/useAuth'
import React, { useEffect, useState } from 'react'
import { StepButton } from 'ui/Stepper/StepButton'
import { Stepper } from 'ui/Stepper/Stepper'
import { useStyles } from './Update2fa.styles'

const steps = [
  'Remove Authenticator',
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
  // TODO Add necessary logic here if needed
  const isStepFailed = (index: number) => false

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const getVariantsConditions = (index: number) => ({
    active: isStepActive(index),
    completed: isStepCompleted(index),
    error: isStepFailed(index)
  })

  const stepInfo = matches
    ? {
        label: steps[activeStep],
        activeStep: activeStep + 1,
        totalSteps: steps.length
      }
    : undefined

  return (
    <Grid
      container
      xs={12}
      className={classes.wrapper}
      justifyContent={'center'}
    >
      <Grid className={classes.leftBlock}>
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
          <Stepper
            orientation={matches ? 'horizontal' : 'vertical'}
            activeStep={activeStep}
            nonLinear
            withMobileDropdown={false}
            title={'Progress'}
            stepInfo={stepInfo}
          >
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
