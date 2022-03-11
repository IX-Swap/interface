import { Paper, Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

export const BreadcrumbsKit = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Breadcrumbs>
          <Link href='#'>Knowledge Center</Link>
          <Typography>News</Typography>
        </Breadcrumbs>
      </Paper>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Breadcrumbs>
          <Link href='#'>Identities</Link>
          <Link href='#'>Individual</Link>
          <Typography>User</Typography>
        </Breadcrumbs>
      </Paper>
    </ThemeProvider>
  )
}
