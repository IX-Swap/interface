import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import BlockchainImage from 'assets/images/blockchain-image.png'
import { useStyles } from './BlockchainSettingsPlaceholder.styles'

export const BlockchainSettingsPlaceholder = () => {
  const styles = useStyles()

  return (
    <Card
      data-testid='blockchain-settings-placeholder'
      className={styles.wrapper}
      elevation={0}
    >
      <CardContent>
        <Grid container alignItems='center'>
          <Grid item xs={6}>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <img src={BlockchainImage} alt='Blockchain' />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant='h4'
              align='center'
              color='textSecondary'
              className={styles.text}
            >
              Please select any blockchain protocol to view and edit the
              information
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
