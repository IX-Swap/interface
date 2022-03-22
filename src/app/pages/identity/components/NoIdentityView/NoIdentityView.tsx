import { Grid } from '@mui/material'
import { CreateCorporateIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateCorporateIdentityButton'
import { CreateDetailsOfIssuanceButton } from 'app/pages/identity/components/NoIdentityView/CreateDetailsOfIssuanceButton'
import { CreateIndividualIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIndividualIdentityButton'
import { NoIdentityCard } from 'app/pages/identity/components/NoIdentityView/NoIdentityCard'
import React from 'react'

export const NoIdentityView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} md={4}>
          <CreateIndividualIdentityButton />
        </Grid>
        <Grid item xs={12} md={4}>
          <CreateCorporateIdentityButton />
        </Grid>
        <Grid item xs={12} md={4}>
          <CreateDetailsOfIssuanceButton />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <NoIdentityCard />
      </Grid>
    </Grid>
  )
}
