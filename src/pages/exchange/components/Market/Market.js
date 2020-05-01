import React from 'react'
import { Grid, Paper, Box, Typography } from '@material-ui/core'
import useStyles from 'pages/exchange/styles'

export default function Market ({ state }) {
  const marketCap = state.price * state.totalSupply
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Grid container justify='center' alignItems='center'>
          <Grid item md={6}>
            <Box pl={2} m={2}>
              <Box ml={2} mt={1}>
                <img
                  src={state.logo}
                  height={100}
                  width={100}
                  alt='investax-market'
                />
              </Box>
              <Box mt={3} ml={4} pr={11}>
                <Typography variant='h3'>
                  <b>
                    {state.symbol}
                    {state.price}
                  </b>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} m={3}>
            <Box pl={2}>
              <Box m={1} pt={1}>
                <Typography variant='h5'>
                  <b>{state.pair}</b>
                </Typography>
              </Box>
              <Box m={1}>
                <Typography>{state.capitalStructure}</Typography>
              </Box>
              <Box m={1}>
                <Typography>
                  {state.symbol}
                  {marketCap}
                </Typography>
              </Box>
              <Box m={1}>
                <Typography>
                  <b>{state.change}%</b>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
