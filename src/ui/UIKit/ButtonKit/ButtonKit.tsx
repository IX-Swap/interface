import { Paper, Grid } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'
import { BasicButtons } from 'ui/UIKit/ButtonKit/BasicButtons'
import { ButtonGroupKit } from 'ui/UIKit/ButtonKit/ButtonGroup'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

export const ButtonKit = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BasicButtons />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroupKit />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}
