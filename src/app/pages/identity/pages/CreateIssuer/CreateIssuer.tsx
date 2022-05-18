import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIssuerForm } from 'app/pages/identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const CreateIssuer = () => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Create Corporate Issuer Identity' />
      </Grid>
      <RootContainer>
        <Grid container item xs={12}>
          <VSpacer size='medium' />
        </Grid>
        <Grid item xs={12}>
          <CorporateIssuerForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
