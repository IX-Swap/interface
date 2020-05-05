import React from 'react'
import { Grid, Paper, Box, Typography } from '@material-ui/core'
import useStyles from 'pages/exchange/styles'
import NumberFormat from 'react-number-format'

export default function Market ({ state, market }) {
  const data = state.markets[market].market

  const marketCap = data.price * data.totalSupply
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={6} md={6}>
            <Box p={2}>
              <Grid container justify='center'>
                <Grid item xs={12} sm={12} md={12}>
                  <center>
                    <img
                      src={data.logo}
                      height={100}
                      width={100}
                      alt='investax-market'
                    />
                  </center>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <center>
                    <Typography variant='h3'>
                      <b>
                        {data.symbol}
                        {data.price}
                      </b>
                    </Typography>
                  </center>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} m={3}>
            <Box pl={2}>
              <Box m={1} pt={1}>
                <Typography variant='h5'>
                  <b>{data.pair}</b>
                </Typography>
              </Box>
              <Box m={1}>
                <Typography>{data.capitalStructure}</Typography>
              </Box>
              <Box m={1}>
                <Typography>
                  <NumberFormat
                    value={marketCap}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </Typography>
              </Box>
              <Box m={1}>
                <Typography>
                  <b>{data.change}%</b>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
