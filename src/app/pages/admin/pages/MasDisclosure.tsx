import { MasDisclosureForm } from 'app/pages/admin/components/MasDisclosureForm'
import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { MasDisclosurePreviewCard } from 'app/pages/admin/components/MasDisclosurePreviewCard'
import { UploadExchangeRules } from 'app/pages/admin/components/UploadExchangeRules/UploadExchangeRules'

export const MasDisclosure = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='MAS Disclosure' />
      </Grid>
      <Grid item>
        <Typography variant={'subtitle2'}>
          The disclosure added on this page will be displayed on exchange
          screen.
        </Typography>
        <VSpacer size={'extraMedium'} />
      </Grid>
      <Grid item container xs={12} spacing={5}>
        <Grid item xs={12} md={9}>
          <MasDisclosureForm />
        </Grid>
        <Grid item xs={12} md={3}>
          <MasDisclosurePreviewCard />
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <UploadExchangeRules />
      </Grid>
      <Grid item xs={12}>
        <VSpacer size='large' />
      </Grid>
    </Grid>
  )
}
