import { Paper, Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { VSpacer } from 'components/VSpacer'

export const BreadcrumbsKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Breadcrumbs>
          <Link href='#'>Knowledge Center</Link>
          <Typography>News</Typography>
        </Breadcrumbs>

        <VSpacer size={'medium'} />

        <Breadcrumbs>
          <Link href='#'>Identities</Link>
          <Link href='#'>Individual</Link>
          <Typography>User</Typography>
        </Breadcrumbs>
      </Paper>
    </UIKitThemeWrapper>
  )
}
