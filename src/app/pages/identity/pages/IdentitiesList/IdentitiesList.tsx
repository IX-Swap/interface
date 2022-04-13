import React from 'react'
import { Grid, Typography } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
import { RootContainer } from 'ui/RootContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, isLoadingIdentities, detailsOfIssuance } =
    useGetIdentities()

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  return (
    <AppContentWrapper container background='default'>
      <RootContainer background='default'>
        <Grid container spacing={5}>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h2' align='center'>
                Create your Identity
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' align='center' color='textSecondary'>
                Choose the type of Identity
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {hasIdentity || detailsOfIssuance !== undefined ? (
              <IdentityPreview />
            ) : (
              <NoIdentityView />
            )}
          </Grid>
        </Grid>
      </RootContainer>
    </AppContentWrapper>
  )
}
