import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, isLoadingIdentities } = useGetIdentities()

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader
          title='Identity'
          alignment='flex-start'
          showBreadcrumbs={false}
        />
      </Grid>
      <Grid item xs={12}>
        {hasIdentity ? <IdentityPreview /> : <NoIdentityView />}
      </Grid>
    </Grid>
  )
}
