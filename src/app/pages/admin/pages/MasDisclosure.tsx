import { MasDisclosureForm } from 'app/pages/admin/components/MasDisclosureForm'
import { Grid, Typography } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { MasDisclosurePreviewCard } from 'app/pages/admin/components/MasDisclosurePreviewCard'

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
    </Grid>
  )
}
