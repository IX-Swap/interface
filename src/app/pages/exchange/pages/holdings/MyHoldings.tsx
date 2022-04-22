import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { HoldingsTables } from 'app/pages/exchange/components/HoldingsTables/HoldingsTables'
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
    <RootContainer>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <PageHeader title='My Holdings' showBreadcrumbs />
        </Grid>
        <Grid item>
          <Typography variant='h3'>{headerContent.title}</Typography>
          <VSpacer size='small' />
          <Typography variant='body1'>{headerContent.subtitle}</Typography>
        </Grid>
        <Grid item>
          <VSpacer size='small' />
          <HoldingsTables setHeaderContent={setHeaderContent} />
        </Grid>
      </Grid>
    </RootContainer>
  )
}
