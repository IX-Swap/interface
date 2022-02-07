import React from 'react'
import { Box, Grid, Typography, Hidden } from '@mui/material'
import authy from 'assets/icons/authy.svg'
import { grey } from '@mui/material/colors'
import gauth from 'assets/icons/gauth.svg'

export interface SetupScreenshotProps {
  gauthLabel: string
  gauthScreenshot: string
  authyLabel: string
  authyScreenshot: string
}

export const SetupScreenshot = ({
  gauthLabel,
  gauthScreenshot,
  authyLabel,
  authyScreenshot
}: SetupScreenshotProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <img
              alt='google authenticator icon'
              width={40}
              height={40}
              src={gauth}
            />
          </Grid>
          <Grid item>
            <Typography>{gauthLabel}</Typography>
          </Grid>
        </Grid>
        <Box height={200} pl={3} marginY={1}>
          <img
            height='100%'
            width='auto'
            src={gauthScreenshot}
            alt='Google Authenticator screenshot'
          />
        </Box>
      </Grid>
      <Hidden lgDown>
        <Grid item>
          <Box width={1} height='100%' borderRight={`1px solid ${grey[300]}`} />
        </Grid>
      </Hidden>
      <Grid item>
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <img alt='authy icon' width={40} height={40} src={authy} />
          </Grid>
          <Grid item>
            <Typography>{authyLabel}</Typography>
          </Grid>
        </Grid>
        <Box height={200} pl={3} marginY={1}>
          <img
            height='100%'
            width='auto'
            src={authyScreenshot}
            alt='Authy screenshot'
          />
        </Box>
      </Grid>
    </Grid>
  )
}
