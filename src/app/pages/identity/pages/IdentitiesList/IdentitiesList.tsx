import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
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
    <AppContentWrapper container background='light'>
      <Grid container spacing={3} style={{ display: 'table' }}>
        <Grid item xs={12}>
          <PageHeader
            title='Identity'
            alignment='flex-start'
            showBreadcrumbs={false}
          />
        </Grid>
        <RootContainer background='light'>
          <Grid item xs={12}>
            {hasIdentity || detailsOfIssuance !== undefined ? (
              <IdentityPreview />
            ) : (
              <NoIdentityView />
            )}
          </Grid>
        </RootContainer>
      </Grid>
    </AppContentWrapper>
  )
}
