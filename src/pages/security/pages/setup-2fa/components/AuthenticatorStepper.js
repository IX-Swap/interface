// @flow
import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Button
} from '@material-ui/core'
import PageTitle from 'components/PageTitle'
import { useForm, FormContext } from 'react-hook-form'
import { makeStyles } from '@material-ui/styles'
import usePrevious from 'hooks/usePrevious'
import { snackbarService } from 'uno-material-ui'
import { signOut } from 'context/user/actions'
import { useUserDispatch } from 'context/user'
import StepOneDownload from './StepOneDownload'
import StepTwoScan from './StepTwoScan'
import StepThreeBackup from './StepThreeBackup'
import StepFourEnable from './StepFourEnable'
import { useTwoFactorState, useTwoFactorDispatch } from '../modules'
import { setupTwoFactor, confirmTwoFactor } from '../modules/actions'
import { STATUS as TFA_STATUS } from '../modules/types'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    width: '100px',
    padding: '0.5em'
  }
}))
const FINAL_STEP = 3

const getSteps = () => [
  'Download App',
  'Scan QR Code',
  'Backup Key',
  'Enable Google Authenticator'
]

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return <StepOneDownload />
    case 1:
      return <StepTwoScan />
    case 2:
      return <StepThreeBackup />
    case 3:
      return <StepFourEnable />
    default:
      return 'Unknown stepIndex'
  }
}

const AuthenticatorStepper = () => {
  const userDispatch = useUserDispatch()
  const steps = getSteps()
  const [activeStep, setActiveStep] = useState(0)
  const { status, error, confirmed } = useTwoFactorState()
  const dispatch = useTwoFactorDispatch()
  const methods = useForm()
  const classes = useStyles()
  const { handleSubmit } = methods
  const prevStatus = usePrevious(status)
  const history = useHistory()

  useMemo(() => {
    // Setup 2Factor on load
    if (status === TFA_STATUS.INIT) {
      setupTwoFactor(dispatch)
    }

    // Display confirm response
    if (prevStatus === TFA_STATUS.SAVING && status === TFA_STATUS.IDLE) {
      let message =
        'Google Authenticator Setup Success! You will be redirected to login page.'
      let type = 'success'

      if (confirmed) {
        snackbarService.showSnackbar(message, type)
        // logout user

        setTimeout(() => {
          signOut(userDispatch)
        }, 1500)
      } else {
        type = 'error'
        message = error
        snackbarService.showSnackbar(message, type)
      }
    }
  }, [prevStatus, status, dispatch, confirmed, error, userDispatch])

  const onSubmit = ({ otp }) => {
    confirmTwoFactor(dispatch, otp)
  }

  const handleNext = () => {
    if (activeStep >= steps.length) {
      return
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    if (activeStep <= 0) {
      history.push('/security')
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Container>
      <PageTitle title='Enable Google Authenticator' />

      <Box mt={8}>
        <Paper elevation={0}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormContext {...methods}>
            <div onSubmit={handleSubmit(onSubmit)}>
              <Box height='300px' pb={8}>
                <Grid
                  style={{ height: 'inherit' }}
                  container
                  alignItems='center'
                  justify='center'
                >
                  {getStepContent(activeStep)}
                </Grid>
              </Box>
              <Grid container justify='center'>
                {activeStep === FINAL_STEP ? (
                  <Button
                    className={classes.button}
                    size='large'
                    type='submit'
                    disabled={status === TFA_STATUS.SAVING}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    size='large'
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </div>
          </FormContext>
          <Box p={3}>
            <Button size='small' onClick={handleBack}>
              Go Back
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default AuthenticatorStepper
