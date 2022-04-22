import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BlockchainSettingsContent } from 'app/pages/admin/components/BlockchainSettingsContent/BlockchainSettingsContent'
import { BlockchainSelector } from 'app/pages/admin/components/BlockchainSelector/BlockchainSelector'
import { RootContainer } from 'ui/RootContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'

export const BlockchainSettings = () => (
  <AppContentWrapper container background='light'>
    <RootContainer>
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
    </RootContainer>
  </AppContentWrapper>
)
