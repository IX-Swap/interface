import { Grid, Radio, Switch, Checkbox, Typography } from '@mui/material'
import React from 'react'
import { getThemeOverrides } from 'themes/new/overrides'
import { lightTheme } from 'themes/new/light'
// import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  ...lightTheme,
  typography
})
theme.components = getThemeOverrides(theme)

export const RadioCheckSwitchKit = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid item container md={6} spacing={2}>
        <Grid item>
          <Typography color='text.primary'>Radio:</Typography>
        </Grid>
      </Grid>
      <Grid item container md={6} spacing={2}>
        <Grid item>
          <Radio disabled />
        </Grid>
        <Grid item>
          <Radio />
        </Grid>
        <Grid item>
          <Radio checked />
        </Grid>
        <Grid item>
          <Radio checked disabled />
        </Grid>
      </Grid>

      <Grid item container md={3} spacing={2}>
        <Grid item>
          <Typography color='text.primary'>Checkbox:</Typography>
        </Grid>
      </Grid>
      <Grid item container md={3} spacing={2}>
        <Grid item>
          <Checkbox disabled />
        </Grid>
        <Grid item>
          <Checkbox />
        </Grid>
        <Grid item>
          <Checkbox defaultChecked />
        </Grid>
        <Grid item>
          <Checkbox checked disabled />
        </Grid>
      </Grid>

      <Grid item container md={3} spacing={2}>
        <Grid item>
          <Typography color='text.primary'>Switch:</Typography>
        </Grid>
      </Grid>
      <br />
      <Grid item container md={3} spacing={2}>
        <Grid item>
          <Switch checked />
        </Grid>
        <Grid item>
          <Switch />
        </Grid>
        <Grid item>
          <Switch checked disabled />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
