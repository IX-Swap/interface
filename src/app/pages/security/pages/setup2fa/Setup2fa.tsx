import React from 'react'
import {
  Container,
  Box,
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
import { Aside } from 'app/pages/security/pages/setup2fa/components/Aside'
import { Enabled } from 'app/pages/security/pages/setup2fa/components/Enabled'

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
      return <Enabled />
  }
}

export const Setup2fa = () => {
  const store = useSetup2faStore()

  return useObserver(() => (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12} lg={2}>
        <Aside />
      </Grid>
      <Grid item xs={12} md={12} lg={10}>
        <Container>
          <Box>
            <Stepper activeStep={store.activeStep} alternativeLabel>
              {store.steps.map(label => (
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
                  {getComponent(store.activeStep)}
                </Box>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={3}
                  justifyContent='center'
                  alignItems='center'
                >
                  {store.activeStep > 0 &&
                    store.activeStep < store.steps.length && (
                      <Grid item>
                        <Button
                          variant='outlined'
                          color='primary'
                          disableElevation
                          onClick={() => store.prevPage()}
                        >
                          Back
                        </Button>
                      </Grid>
                    )}

                  {store.activeStep < store.steps.length - 1 && (
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        onClick={() => store.nextPage()}
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
  ))
}
