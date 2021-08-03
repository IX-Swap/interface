import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { useStyles } from 'auth/components/InfoPanel.styles'
import { Info } from 'auth/components/Info'

export const InfoPanel = () => {
  const { container } = useStyles()

  return (
    <Box className={container}>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Info title='As an Investor' info={['Invest', 'Trade']} />
        </Grid>
        <Grid item>
          <Info
            title='As an Issuer'
            info={['Raise Capital', 'Sell Assets', 'VCC Funds']}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
