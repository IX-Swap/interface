import { Grid, Typography } from '@mui/material'
import React from 'react'
import { TabDemo } from 'ui/UIKit/TabsKit/TabDemo'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'
import { darkTheme } from 'themes/new/dark'
import { ContainedTabDemo } from 'ui/UIKit/TabsKit/ContainedTabDemo'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

const dTheme = createTheme({ ...darkTheme, typography })
dTheme.components = getThemeOverrides(dTheme)

export const TabsKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6'>Tabs</Typography>
      </Grid>
      <Grid item xs={6}>
        <ThemeProvider theme={theme}>
          <TabDemo />
        </ThemeProvider>
      </Grid>
      <Grid item xs={6}>
        <ThemeProvider theme={dTheme}>
          <TabDemo />
        </ThemeProvider>
      </Grid>
      <Grid item xs={6}>
        <ThemeProvider theme={theme}>
          <ContainedTabDemo />
        </ThemeProvider>
      </Grid>
      <Grid item xs={6}>
        <ThemeProvider theme={dTheme}>
          <ContainedTabDemo />
        </ThemeProvider>
      </Grid>
    </Grid>
  )
}
