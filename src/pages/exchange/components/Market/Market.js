import React from 'react'
import { Grid, Paper, Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 240,
    padding: 20
  }
}))

export default function Market ({ state }) {
  const marketCap = state.price * state.totalSupply
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Grid container>
          <Grid item md={6}>
            <Box ml={2} mt={1}>
              <img
                src={state.logo}
                height={100}
                width={100}
                alt='investax-market'
              />
            </Box>
          </Grid>
          <Grid item>
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
            </Box>
          </Grid>
          <Grid container direction='row' justify='space-between'>
            <Grid item>
              <Box mt={4} pl={4}>
                <Typography variant='h3'>
                  <b>
                    {state.symbol}
                    {state.price}
                  </b>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={4} pr={11}>
                <Typography variant='h3'>
                  <b>{state.change}%</b>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
