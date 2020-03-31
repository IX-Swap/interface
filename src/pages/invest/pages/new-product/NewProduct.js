import React from 'react'
import { Grid, Box, Card, Typography, Button } from '@material-ui/core'
import {
  useInvestState,
  useInvestDispatch,
  INVEST_STATUS,
  createDso
} from 'context/InvestContext'

export default function NewProduct ({ history }) {
  const { handleCreateDso } = useCreateDsoLogic(history)

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={11} lg={8}>
        <Card>
          <Box mt={4} p={3}>
            <Grid container justify='center' alignContent='center'>
              <Grid item md={8}>
                <Box p={4}>
                  <Typography variant='h1'>
                    <b>DSO</b>
                  </Typography>
                  <Typography variant='subtitle1'>
                    <i>Digital Security Offering</i>
                  </Typography>
                  <p>
                    A digital security offering is a private market security
                    offering available to accredited investors. Smart Contracts
                    are used to digitize a traditional equity or debt offering.
                  </p>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box mt={5}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleCreateDso()}
                  >
                    NEW DSO
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item md={8}>
                <Box p={4}>
                  <Typography variant='h1'>
                    <b>DESOP</b>
                  </Typography>
                  <Typography variant='subtitle1'>
                    <i>Digital Employee Stock Option Program</i>
                  </Typography>
                  <p>
                    InvestaX is pioneering the use of our latest technology to
                    design a better, more transparent, higher velocity ESOP,
                    which we believe drives greater productivity and balance. We
                    call it the Digital Employee Stock Option Plan (DESOP), a
                    world 1st and breakthrough improvement and innovation from
                    the current traditional Employee Stock Option Plan (ESOP).
                  </p>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box mt={5}>
                  <Button variant='contained' color='primary'>
                    NEW DESOP
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

const useCreateDsoLogic = history => {
  const { status: investStatus, dso, ...invest } = useInvestState()
  const isDsoReady = ![INVEST_STATUS.INIT, INVEST_STATUS.GETTING].includes(
    investStatus
  )
  const error = invest.error
  const investDispatch = useInvestDispatch()

  if (investStatus === INVEST_STATUS.CREATED) {
    history.push(`/app/invest/${dso._id}/edit`)
  }
  const handleCreateDso = () => {
    createDso(investDispatch).catch(() => {})
  }

  return { isDsoReady, dso, error, handleCreateDso }
}
