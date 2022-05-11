import { Card, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { ReactComponent as Success } from 'assets/icons/alerts/success.svg'

export const SubmitIdentity = () => {
  return (
    <AppContentWrapper container background='default'>
      <Card sx={{ paddingLeft: '184px', paddingTop: '16.5px' }}>
        <Box
          style={{ display: 'flex', flexDirection: 'row' }}
          sx={{
            width: 920,
            height: 372,
            backgroundColor: 'white',
            borderRadius: '16.5px'
          }}
        >
          <Grid style={{ width: '190px', padding: '64px 0 0 59px' }}>
            <Success height={80} width={80} />
          </Grid>
          <Grid style={{ paddingTop: '64px' }} container spacing={2}>
            <Typography variant='h2'>
              Thank you for your application!
            </Typography>
            <Typography fontSize={16} fontWeight={400}>
              We are checking your application now, this usually takes from one
              to three days
            </Typography>
          </Grid>
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '16.5px'
          }}
          sx={{
            width: 920,
            height: 326,
            backgroundColor: 'white',
            borderRadius: '16.5px'
          }}
        >
          Choose the type of Identity
        </Box>
      </Card>
    </AppContentWrapper>
  )
}
