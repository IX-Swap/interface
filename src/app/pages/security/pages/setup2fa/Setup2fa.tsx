import React from 'react'
import {
  Container,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid
} from '@material-ui/core'
import { useObserver } from 'mobx-react'
import { useSetup2faStore } from './context'
import { Step1Download } from './components/Step1Download'
import { Step2Scan } from './components/Step2Scan'
import { Step3Backup } from './components/Step3Backup'
import { Step4Enable } from './components/Step4Enable'

const getComponent = (index: number) => {
  switch (index) {
    case 0:
      return <Step1Download />
    case 1:
      return <Step2Scan />
    case 2:
      return <Step3Backup />
    case 3:
      return <Step4Enable />
    default:
      return <Step1Download />
  }
}

export const Setup2fa = () => {
  const store = useSetup2faStore()

  return useObserver(() => (
    <Container>
      <Box mt={8}>
        <Paper elevation={0}></Paper>
        <Stepper activeStep={store.activeStep} alternativeLabel>
          {store.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container justify='center' alignItems='center'>
          <Grid item container>
            <Box my={4} width='100%'>
              {getComponent(store.activeStep)}
            </Box>
          </Grid>
          {store.activeStep !== store.steps.length - 1 && (
            <Button
              variant='contained'
              color='primary'
              disableElevation
              onClick={() => store.nextPage()}
            >
              Next
            </Button>
          )}
        </Grid>
      </Box>
    </Container>
  ))
}
