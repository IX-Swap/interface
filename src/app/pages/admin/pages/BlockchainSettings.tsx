import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BlockchainSettingsContent } from 'app/pages/admin/components/BlockchainSettingsContent/BlockchainSettingsContent'
import { BlockchainSelector } from 'app/pages/admin/components/BlockchainSelector/BlockchainSelector'

export const BlockchainSettings = () => (
  <Grid container direction='column' spacing={4}>
    <Grid item xs={12}>
      <PageHeader title='Blockchain Settings' />
    </Grid>
    <Grid item xs={12} container>
      <BlockchainSelector />
    </Grid>
    <Grid item xs={12}>
      <BlockchainSettingsContent />
    </Grid>
  </Grid>
)
