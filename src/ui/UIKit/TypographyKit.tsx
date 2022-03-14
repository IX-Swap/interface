import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { darkTheme } from 'themes/new/dark'
import { lightTheme } from 'themes/new/light'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'

export const TypographyKit = () => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)
  const currentNewTheme = isDarkThemeOn ? darkTheme : lightTheme
  const theme = createTheme({ ...currentNewTheme, typography })
  theme.components = getThemeOverrides(theme)

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Grid
          container
          spacing={2}
          alignItems='flex-start'
          sx={{
            padding: 4
          }}
        >
          <Grid item container xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h2'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h3'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5'>IXPrime Title</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>subtitle1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>subtitle2</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>body1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>body2</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='caption'>caption</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='overline'>overline</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Box marginTop={10}>
        <Button
          variant={'contained'}
          onClick={() => setIsDarkThemeOn(!isDarkThemeOn)}
        >
          {isDarkThemeOn ? 'Switch to Light theme' : 'Switch to Dark theme'}
        </Button>
      </Box>
    </ThemeProvider>
  )
}
