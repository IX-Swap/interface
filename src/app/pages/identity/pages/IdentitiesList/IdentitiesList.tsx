import React from 'react'
import { Grid } from '@material-ui/core'
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
      <RootContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PageHeader
              title='Identity'
              alignment='flex-start'
              showBreadcrumbs={false}
            />
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
