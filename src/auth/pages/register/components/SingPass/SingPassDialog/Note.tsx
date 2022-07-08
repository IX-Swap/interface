import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const Note = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography color='#0E1E3F'>
          Your details will NOT be auto-saved signing up using MyInfo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color='#0E1E3F'>
          You'd still need the documents below:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box color='#0E1E3F'>
          <ul
            style={{
              paddingLeft: 16
            }}
          >
            <li>
              <Typography color='#0E1E3F'>
                Your recent bank statement
              </Typography>
            </li>
            <li>
              <Typography color='#0E1E3F'>
                Proof of your accredited investor status
              </Typography>
            </li>
            <li>
              <Typography color='#0E1E3F'>
                Passport, selfie and proof of residence for Non-Singapore
                residents
              </Typography>
            </li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  )
}
