import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { HoldingsTables } from 'app/pages/accounts/components/HoldingsTables/HoldingsTables'
import { VSpacer } from 'components/VSpacer'
import React, { useState } from 'react'
import { RootContainer } from 'ui/RootContainer'

export const MyHoldings = () => {
  const [headerContent, setHeaderContent] = useState<{
    title: string
    subtitle: string
  }>({
    title: 'Holdings',
    subtitle:
      'View, manage and track the value of your private company shares and stock options over time. Receive insights, and investment and liquidity opportunities specific to your holdings.'
  })
  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='My Holdings' showBreadcrumbs />
      </Grid>

      <Grid item>
        <RootContainer>
          <Typography variant='h3'>{headerContent.title}</Typography>
          <VSpacer size='small' />
          <Typography variant='body1'>{headerContent.subtitle}</Typography>
        </RootContainer>
      </Grid>
      <Grid item>
        <RootContainer>
          <VSpacer size='small' />
          <HoldingsTables setHeaderContent={setHeaderContent} />
        </RootContainer>
      </Grid>
    </Grid>
  )
}